import requests
from bs4 import BeautifulSoup
from scrapers.headers import get_headers
from scrapers.scraper import Scraper

class Amazon(Scraper):
    key = 'AMZN'
    url = 'https://www.amazon.sg'
    sort_choices = {
        'relevance': 'relevanceblender',
        'priceasc': 'price-asc-rank',
        'pricedesc': 'price-desc-rank',
    }

    def parse(self, params):
        parsed = {}
        if params.get('search'):
            parsed['k'] = params['search'].replace(' ', '+')
        if params.get('page'):
            parsed['page'] = int(params['page'])
        if params.get('pages'):
            parsed['pages'] = int(params['pages'])
        if params.get('minPrice') or params.get('maxPrice'):
            minPrice, maxPrice = params.get('minPrice'), params.get('maxPrice')
            minPrice = int(minPrice) * 100 if minPrice else ''
            maxPrice = int(maxPrice) * 100 if maxPrice else ''
            parsed['rh'] = f'p_36:{minPrice}-{maxPrice}'
        if params.get('sort'):
            parsed['s'] = self.sort_choices[params['sort']]
        return parsed
    
    def extract(self, response):
        soup = BeautifulSoup(response.text, 'html.parser')
        products = soup.find_all('div', {'data-component-type': 's-search-result'})
        results = []
        for product in products:
            try:
                data = {}
                data['title'] = product.find('span', {'class': 'a-size-base-plus a-color-base a-text-normal'}).text
                data['url'] = self.url + product.find('a', {'class': 'a-link-normal s-underline-text s-underline-link-text s-link-style a-text-normal'}).get('href')
                data['id'] = f'{Amazon.key}_{data["url"].split("/")[5]}'
                data['image'] = product.find('img', {'class': 's-image'}).get('src')
                data['currency'] = product.find('span', {'class': 'a-price-symbol'}).text
                data['price'] = float((product.find('span', {'class': 'a-price-whole'}).text + product.find('span', {'class': 'a-price-fraction'}).text).replace(',', ''))
                try:
                    rating = product.find('span', {'class': 'a-icon-alt'}).text[:-6]
                    rating, rating_qty = rating.split(' out of ')
                    data['rating'] = round(float(rating), 1)
                    data['rating_qty'] = float(rating_qty)
                except Exception:
                    data['rating'] = 0
                    data['rating_qty'] = 0
                data['platform'] = 'Amazon'
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
            response = requests.get(f'{self.url}/s', params=params, headers=get_headers(self.url))
            results['products'].extend(self.extract(response))
        
        results['last_searched'] = response.url
        results['count'] = len(results['products'])
        return results
