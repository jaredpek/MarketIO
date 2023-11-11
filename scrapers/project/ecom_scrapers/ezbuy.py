import requests
from ecom_scrapers.headers import get_headers
from ecom_scrapers.scraper import Scraper

class EzBuy(Scraper):
    url = 'https://www.ezbuy.sg'
    sort_choices = {
        'relevance': 'XSearchSortBestMatch',
        'priceasc': 'XSearchSortPriceUp',
        'pricedesc': 'XSearchSortPriceDown',
    }
    label_choices = {
        'relevance': 'Best Match',
        'priceasc': 'Price Low To High',
        'pricedesc': 'Price High To Low',
    }
    limit = 56

    def parse(self, params):
        parsed = {
            'search':{
                'keyword': '',
                'filters': [{
                    'type': 'XFilterTypeSelect',
                    'typeId': 'Sort',
                    'name': 'Sort',
                    'filterId': 'Sort',
                    'values': [{'valueId': 'XSearchSortBestMatch', 'checked': True}],
                }],
                'searchType': 'XSearchTypeNormal',
            },
            'offset': 0,
            'limit': self.limit
        }
        if params.get('search'):
            parsed['search']['keyword'] = params['search']
        if params.get('page'):
            parsed['offset'] = (int(params['page']) - 1) * self.limit
        if params.get('pages'):
            parsed['limit'] = int(params['pages']) * self.limit
        if params.get('minPrice') or params.get('maxPrice'):
            minPrice, maxPrice = params.get('minPrice'), params.get('maxPrice')
            price_range = {'checked': True}
            if minPrice:
                price_range['num1'] = int(minPrice)
            if maxPrice:
                price_range['num2'] = int(maxPrice)
            parsed['search']['filters'].append({
                'type': 'XFilterTypePrice',
                'typeId': 'Price',
                'name': 'Price',
                'filterId': 'Price',
                'values': [price_range]
            })
        if params.get('minPrice'):
            parsed['search']['filters'][1]['values'][0]['num1'] = int(params['minPrice']) or 0
        if params.get('maxPrice'):
            parsed['search']['filters'][1]['values'][0]['num2'] = int(params['maxPrice']) or 0
        if params.get('sort'):
            parsed['search']['filters'][0]['values'][0]['valueId'] = self.sort_choices[params['sort']]
            parsed['search']['filters'][0]['values'][0]['label'] = self.label_choices[params['sort']]
        return parsed
    
    def extract(self, response):
        products = response.json()['list']['products']
        results = []
        for product in products:
            product = product['product']
            try:
                data = {}
                data['title'] = product.get('name')
                data['url'] = f'{self.url}/product/{product.get("gpid")}.html'
                data['image'] = product.get('img')
                data['currency'] = 'S$'
                price = product.get('priceInfo').get('price')
                data['price'] = float(price[1:].replace(',', ''))
                data['rating'] = product.get('leftView').get('rateScore')
                data['rating_qty'] = product.get('rightView').get('val')
                data['platform'] = 'EzBuy'
                results.append(data)
            except Exception:
                continue
        return results

    def scrape(self, params):
        offset = params.get('offset')
        limit = params.get('limit')
        page = offset // self.limit + 1
        pages = limit // self.limit

        params['limit'] = self.limit
        results = {'products': []}
        for _ in range(page, page + pages):
            response = requests.post('https://sg-en-web-api.ezbuy.sg/api/spk.App/Search', json=params, headers=get_headers(self.url))
            results['products'].extend(self.extract(response))
            params['offset'] += self.limit
        
        results['last_searched'] = response.url
        results['count'] = len(results['products'])
        return results
