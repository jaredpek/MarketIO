import requests
from scrapers.headers import get_headers
from scrapers.scraper import Scraper

class Lazada(Scraper):
    key = 'LZDA'
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
            'from': 'input',
        }
        if params.get('search'):
            parsed['q'] = params['search'].replace(' ', '+')
        if params.get('page'):
            parsed['page'] = int(params['page'])
        if params.get('pages'):
            parsed['pages'] = int(params['pages'])
        if params.get('minPrice') or params.get('maxPrice'):
            minPrice, maxPrice = params.get('minPrice'), params.get('maxPrice')
            minPrice = int(minPrice) if minPrice else ''
            maxPrice = int(maxPrice) if maxPrice else ''
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
                data['id'] = f'{Lazada.key}_{product.get("itemId")}'
                data['key'] = data['id']
                data['title'] = product.get('name')
                data['url'] = f'https://{product.get("itemUrl")[2:]}'
                data['image'] = product.get('image')
                data['currency'] = 'S$'
                data['price'] = float(product.get('price'))
                data['rating'] = round(float(product.get('ratingScore') or 0), 1)
                data['rating_qty'] = int(product.get('review') or 0)
                data['platform'] = 'Lazada'
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
            response = requests.get(f'{self.url}/searchbox', params=params, headers=get_headers(self.url))
            results['products'].extend(self.extract(response))
        
        results['last_searched'] = response.url
        results['count'] = len(results['products'])
        return results
