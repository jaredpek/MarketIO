from random import shuffle

from scrapers.scraper import Scraper
from scrapers.aliexpress import AliExpress as AliExpressScraper
from scrapers.amazon import Amazon as AmazonScraper
from scrapers.ezbuy import EzBuy as EzBuyScraper
from scrapers.lazada import Lazada as LazadaScraper
from scrapers.qoo10 import Qoo10 as Qoo10Scraper

available = {
    'aliexpress': AliExpressScraper,
    'amazon': AmazonScraper,
    'ezbuy': EzBuyScraper,
    'lazada': LazadaScraper,
    'qoo10': Qoo10Scraper,
}

class General(Scraper):
    def valid_scrapers(self, scrapers):
        if not scrapers:
            return True
        
        scrapers = str(scrapers).split(',')
        for item in scrapers:
            if not available.get(item):
                return False
        
        return True

    def verify(self, params, results):
        if not self.valid_scrapers(params.get('scrapers')):
            self.set_choice_error('scrapers', "invalid scrapers selected (seperated by '+')", available.keys(), results)
        return super().verify(params, results)
    
    def scrape(self, params):
        results = {
            'products': [],
            'last_searched': [],
        }
        scrapers = params['scrapers']
        for item in scrapers:
            data = available.get(item)().products(params)
            results['products'].extend(data['data']['products'])
            results['last_searched'].append(data['data']['last_searched'])
        
        results['count'] = len(results['products'])
        return results
    
    def parse(self, params):
        parsed = {}
        for item in params:
            parsed[item] = params[item]
        parsed['scrapers'] = params.get('scrapers').split(',') if params.get('scrapers') else list(available.keys())
        return parsed
    
    def products(self, params):
        results = self.default.copy()
        if not self.verify(params, results):
            return results
        
        parsed = self.parse(params)
        results['data'] = self.scrape(parsed)

        if parsed.get('sort') == 'priceasc':
            results['data']['products'].sort(key=lambda product: product['price'])
            return results
        if parsed.get('sort') == 'pricedesc':
            results['data']['products'].sort(key=lambda product: product['price'], reverse=True)
            return results
        
        shuffle(results['data']['products'])
        return results
