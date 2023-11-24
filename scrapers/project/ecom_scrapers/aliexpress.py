import requests
from bs4 import BeautifulSoup
from ecom_scrapers.headers import get_headers
from ecom_scrapers.scraper import Scraper

class AliExpress(Scraper):
    url = 'https://www.aliexpress.com'
    sort_choices = {
        'relevance': 'none',
        'priceasc': 'price_asc',
        'pricedesc': 'price_desc',
    }

    def parse(self, params):
        parsed = {'g': 'y'}
        if params.get('search'):
            parsed['SearchText'] = params['search']
        if params.get('page'):
            parsed['page'] = int(params['page'])
        if params.get('pages'):
            parsed['pages'] = int(params['pages'])
        if params.get('minPrice') or params.get('maxPrice'):
            minPrice, maxPrice = params.get('minPrice'), params.get('maxPrice')
            minPrice = float(minPrice) if minPrice else ''
            maxPrice = float(maxPrice) if maxPrice else ''
            parsed['pr'] += f'{minPrice}-{maxPrice}|'
        if params.get('sort'):
            parsed['SortType'] = self.sort_choices[params['sort']]
        return parsed
    
    def extract(self, response):
        soup = BeautifulSoup(response.text, 'html.parser')
        products = soup.find_all('tr', {'list_type': 'search_new_list_type'})
        results = []
        for product in products:
            try:
                data = {}
                title_section = product.find('a', {'data-type': 'goods_url'})
                data['title'] = title_section.get('title')
                data['url'] = title_section.get('href')
                data['image'] = title_section.find('img').get('gd_src')
                price = product.find('strong', {'title': 'Discounted Price'}).text
                data['currency'] = price[:2]
                data['price'] = float(price[2:].replace(',', ''))
                try:
                    data['rating'] = round(float(product.find('span', {'class': 'rate_v'}).get('title')[8]), 1)
                    data['rating_qty'] = int(product.find('a', {'class': 'lnk_rcm'}).find('strong').text)
                except Exception:
                    data['rating'] = 0
                    data['rating_qty'] = 0
                data['platform'] = 'Qoo10'
                results.append(data)
            except Exception:
                continue
        return results

    def scrape(self, params):
        page = int(params.get('page') or 1)
        pages = int(params.get('pages') or 1)

        results = {'products': []}
        for i in range(page, page + pages):
            params['p'] = i
            response = requests.post(f'{self.url}/w/wholesale-{params["search"]}', params=params, headers=get_headers(self.url))
            results['products'].extend(self.extract(response))
        
        results['last_searched'] = response.url
        results['count'] = len(results['products'])
        return results