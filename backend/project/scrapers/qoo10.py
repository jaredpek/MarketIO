import requests
from bs4 import BeautifulSoup
from scrapers.headers import get_headers
from scrapers.scraper import Scraper

class Qoo10(Scraper):
    key = 'QTEN'
    url = 'https://www.qoo10.sg'
    sort_choices = {
        'relevance': 'r',
        'priceasc': 'p_a',
        'pricedesc': 'p_d',
    }

    def parse(self, params):
        parsed = {
            'search_type': 'SearchItems',
            'f': '',
            'st': 'SG',
            's': 'r',
            'v': 'lt',
            'p': '1',
            'pm': '',
            'so': 'tt',
            'cc': 'N',
            'cb': 'N',
            'cs': 'N',
            'cl': 'Y',
            'ot': 'Y',
        }
        if params.get('search'):
            parsed['search_keyword'] = params['search'].replace(' ', '+')
        if params.get('page'):
            parsed['p'] = int(params['page'])
        if params.get('pages'):
            parsed['pages'] = int(params['pages'])
        if params.get('minPrice') or params.get('maxPrice'):
            minPrice, maxPrice = params.get('minPrice'), params.get('maxPrice')
            minPrice = int(minPrice) if minPrice else ''
            maxPrice = int(maxPrice) if maxPrice else ''
            parsed['f'] += f'pr:{minPrice}-{maxPrice}|'
        if params.get('sort'):
            parsed['s'] = self.sort_choices[params['sort']]
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
                data['id'] = f'{Qoo10.key}_{data["url"].split("/")[-1]}'
                data['key'] = data['id']
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
        page = int(params.get('p') or 1)
        pages = int(params.get('pages') or 1)

        results = {'products': []}
        for i in range(page, page + pages):
            params['p'] = i
            response = requests.post(f'{self.url}/gmkt.inc/Search/DefaultAjaxAppend.aspx', params=params, headers=get_headers(self.url))
            print(f'Qoo10 (Page {i}) {response}')
            results['products'].extend(self.extract(response))
        
        results['last_searched'] = response.url
        results['count'] = len(results['products'])
        return results
