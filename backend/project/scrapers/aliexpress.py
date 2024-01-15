import requests, json
from bs4 import BeautifulSoup
from scrapers.headers import get_headers
from scrapers.scraper import Scraper

class AliExpress(Scraper):
    key = 'ALXP'
    url = 'https://www.aliexpress.com'
    sort_choices = {
        'relevance': 'none',
        'priceasc': 'price_asc',
        'pricedesc': 'price_desc',
    }

    def parse(self, params):
        parsed = {}
        if params.get('search'):
            parsed['SearchText'] = params['search'].replace(' ', '+')
        if params.get('page'):
            parsed['page'] = int(params['page'])
        if params.get('pages'):
            parsed['pages'] = int(params['pages'])
        if params.get('minPrice') or params.get('maxPrice'):
            minPrice, maxPrice = params.get('minPrice'), params.get('maxPrice')
            minPrice = int(minPrice) if minPrice else ''
            maxPrice = int(maxPrice) if maxPrice else ''
            parsed['pr'] = f'{minPrice}-{maxPrice}'
        if params.get('sort'):
            parsed['SortType'] = self.sort_choices[params['sort']]
        return parsed
    
    def extract(self, response):
        soup = BeautifulSoup(response.text, 'html.parser')
        meta_elem = soup.find('meta', {'name': 'aplus-auto-clk'})
        data_elem = meta_elem.next_element.text
        start = data_elem.index('itemList')
        end = data_elem.index('_cost')
        products = json.loads(data_elem[(start + 10):(end - 3)])['content']

        results = []
        for product in products:
            try:
                data = {}
                data['id'] = f'{AliExpress.key}_{product["productId"]}'
                data['key'] = data['id']
                data['title'] = product['title']['seoTitle']
                data['url'] = f'{AliExpress.url}/item/{product["productId"]}.html'
                data['image'] = f'https:{product["image"]["imgUrl"]}'
                data['currency'] = product['prices']['currencySymbol'].replace('G', '')
                price = product['prices'].get('salePrice')
                data['price'] = float(price['minPrice'])
                try:
                    data['rating'] = round(float(product['evaluation']['starRating']), 1)
                    data['rating_qty'] = int(product['trade']['tradeDesc'].split(' ')[0].split('+')[0])
                except Exception:
                    data['rating'] = 0
                    data['rating_qty'] = 0
                data['platform'] = 'AliExpress'
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
            for _ in range(2):
                try:
                    response = requests.get(f'{self.url}/w/wholesale-{params["SearchText"]}.html', params=params, headers=get_headers(self.url))
                    print(f'Aliexpress (Page {page}) {response}')
                    results['products'].extend(self.extract(response))
                    break
                except:
                    continue
        
        results['last_searched'] = response.url
        results['count'] = len(results['products'])
        return results
