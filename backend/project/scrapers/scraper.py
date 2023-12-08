from project.response import Response

class Scraper():
    sort_choices = ['relevance', 'priceasc', 'pricedesc']
    
    def is_positive_int(self, value):
        if (isinstance(value, int) or (isinstance(value, str) and value.isdigit())) and int(value) >= 0:
            return True
        return False
    
    def valid_price(self, minPrice, maxPrice):
        if self.is_positive_int(minPrice) and self.is_positive_int(maxPrice) and int(maxPrice) < int(minPrice):
            return False
        return True

    def verify(self, params, response):
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
            response.set_error('search', response.messages['required'])
        if params.get('page') and not self.is_positive_int(params['page']):
            response.set_error('page', 'this must be a positive integer')
        if params.get('pages') and not self.is_positive_int(params['pages']):
            response.set_error('pages', 'this must be a positive integer')
        if params.get('sort') and params['sort'] not in self.sort_choices:
            response.set_choice_error('sort', '', self.sort_choices)
        if params.get('minPrice') and not self.is_positive_int(params['minPrice']):
            self.set_error('minPrice', 'this must be a positive integer')
        if params.get('maxPrice') and not self.is_positive_int(params['maxPrice']):
            response.set_error('maxPrice', 'this must be a positive integer')
        if not self.valid_price(params.get('minPrice'), params.get('maxPrice')):
            response.set_error('price', 'maximum price must be larger than minimum price')
        if response.result['status'] == 'error':
            return False
        return True
    
    def parse(self, params):
        pass

    def extract(self, response):
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
        returns result dictionary = {\n
            products = list, list of products from the search\n
            count = int, number of products returned from search\n
            last_searched = str, url of the last page that was scraped\n
        }\n
        '''
        pass
    
    def products(self, params):
        response = Response()
        result = response.result
        if not self.verify(params, response):
            return result
        
        parsed = self.parse(params)
        result['data'] = self.scrape(parsed)
        return result
