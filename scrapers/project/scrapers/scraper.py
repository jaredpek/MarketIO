from project.response import Response

class Scraper(Response):
    sort_choices = ['relevance', 'priceasc', 'pricedesc']
    
    def is_positive_int(self, value):
        if (isinstance(value, int) or (isinstance(value, str) and value.isdigit())) and int(value) >= 0:
            return True
        return False
    
    def valid_price(self, minPrice, maxPrice):
        if self.is_positive_int(minPrice) and self.is_positive_int(maxPrice) and int(maxPrice) < int(minPrice):
            return False
        return True

    def verify(self, params, results):
        '''
        validates all search parameters = {\n
            search = str, mandatory, search keyword\n
            page = int, optional, page number\n
            pages = int, optional, page quantity\n
            sort = str, optional, sort option\n
            minPrice = number, optional, minimum price\n
            maxPrice = number, optional, maximum price\n
        }\n
        '''
        if not params.get('search'):
            self.set_error('search', 'this is mandatory field', results)
        if params.get('page') and not self.is_positive_int(params['page']):
            self.set_error('page', 'this must be a positive integer', results)
        if params.get('pages') and not self.is_positive_int(params['pages']):
            self.set_error('pages', 'this must be a positive integer', results)
        if params.get('sort') and params['sort'] not in self.sort_choices:
            self.set_choice_error('sort', '', self.sort_choices, results)
        if params.get('minPrice') and not self.is_positive_int(params['minPrice']):
            self.set_error('minPrice', 'this must be a positive integer', results)
        if params.get('maxPrice') and not self.is_positive_int(params['maxPrice']):
            self.set_error('maxPrice', 'this must be a positive integer', results)
        if not self.valid_price(params.get('minPrice'), params.get('maxPrice')):
            self.set_error('price', 'maximum price must be larger than minimum price', results)
        if results['status'] == 'error':
            return False
        return True
    
    def parse(self, params):
        pass

    def extract(self, url, params):
        '''
        returns a list of products = [{\n
            title = str, product name\n
            url = str, product page url\n
            image = str, product image url\n
            currency = str, currency sold\n
            price = float, product price\n
            rating = float, product rating\n
            rating_qty = int, number of ratings\n
            platform = str, name of platform\n
        }]\n
        '''
        pass

    def scrape(self, params):
        '''
        params = parsed search params\n
        returns results dictionary = {\n
            products = list, list of products from the search\n
            count = int, number of products returned from search\n
            last_searched = str, url of the last page that was scraped\n
        }\n
        '''
        pass
    
    def products(self, params):
        results = self.default.copy()
        if not self.verify(params, results):
            return results
        
        parsed = self.parse(params)
        results['data'] = self.scrape(parsed)
        return results
