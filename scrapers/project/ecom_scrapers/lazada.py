import requests
from ecom_scrapers.headers import get_headers
from ecom_scrapers.scraper import Scraper

class Lazada(Scraper):
    url = 'https://www.lazada.sg'
    sort_choices = {
        'relevance': 'popularity',
        'priceasc': 'priceasc',
        'pricedesc': 'pricedesc',
    }

    def parse(self, params):
        parsed = {
            'ajax': 'true',
            'catalog_redirect_tag': 'true',
            'isFirstRequest': 'true',
            'from': 'input'
        }
        if params.get('search'):
            parsed['q'] = params['search']
        if params.get('page'):
            parsed['page'] = int(params['page'])
        if params.get('pages'):
            parsed['pages'] = int(params['pages'])
        if params.get('minPrice') or params.get('maxPrice'):
            minPrice, maxPrice = params.get('minPrice'), params.get('maxPrice')
            minPrice = float(minPrice) if minPrice else ''
            maxPrice = float(maxPrice) if maxPrice else ''
            parsed['price'] = f'{minPrice}-{maxPrice}'
        if params.get('sort'):
            parsed['sort'] = self.sort_choices[params['sort']]
        return parsed
    
    def extract(self, response):
        try:
            products = response.json()['mods']['listItems']
        except Exception:
            return []
        results = []
        for product in products:
            try:
                data = {}
                data['title'] = product.get('name')
                data['url'] = product.get('itemURL')[2:]
                data['image'] = product.get('image')
                data['currency'] = 'S$'
                data['price'] = float(product.get('price'))
                data['rating'] = float(product.get('ratingScore') or 0)
                data['rating_qty'] = float(product.get('review') or 0)
                results.append(data)
            except Exception:
                continue
        return results

    def scrape(self, params):
        page = int(params.get('page') or 1)
        pages = int(params.get('pages') or 1)

        results = {'products': []}
        for i in range(page, page + pages):
            params['page'] = i
            response = requests.get(f'{self.url}/tag/{params["q"]}', params=params, headers=get_headers(self.url))
            results['products'].extend(self.extract(response))
        
        results['response'] = response
        results['last_searched'] = response.url
        results['count'] = len(results['products'])
        return results