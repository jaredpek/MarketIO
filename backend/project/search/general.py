from random import shuffle

from project.response import Response
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

    def verify(self, params, response):
        if not self.valid_scrapers(params.get('scrapers')):
            response.set_choice_error('scrapers', "invalid scrapers selected (seperated by ',')", available.keys())
        return super().verify(params, response)
    
    def scrape(self, params):
        results = {
            'products': [],
            'last_searched': {},
            'quantity_count': {},
        }
        scrapers = params['scrapers']
        for item in scrapers:
            data = available.get(item)().products(params)
            results['products'].extend(data['data']['products'])
            results['last_searched'][item] = data['data']['last_searched']
            results['quantity_count'][item] = data['data']['count']
        
        results['count'] = len(results['products'])
        return results
    
    def parse(self, params):
        parsed = {}
        for item in params:
            parsed[item] = params[item]
        parsed['scrapers'] = params.get('scrapers').split(',') if params.get('scrapers') else list(available.keys())
        return parsed
    
    def products(self, params):
        response = Response()
        result = response.result
        if not self.verify(params, response):
            return result
        
        parsed = self.parse(params)
        result['data'] = self.scrape(parsed)

        if parsed.get('sort') == 'priceasc':
            result['data']['products'].sort(key=lambda product: product['price'])
            return result
        if parsed.get('sort') == 'pricedesc':
            result['data']['products'].sort(key=lambda product: product['price'], reverse=True)
            return result
        
        shuffle(response.result['data']['products'])
        return result
