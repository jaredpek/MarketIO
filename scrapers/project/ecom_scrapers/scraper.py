class Scraper():
    default = {
        'status': 'success',
        'data': {}
    }
    sort_choices = ['relevance', 'priceasc', 'pricedesc']

    def set_error(self, field, message, results):
        if not results['data'].get('errors'):
            results['data'] = {'errors': {}}
        results['status'] = 'error'
        results['data']['errors'][field] = message
    
    def is_positive_int(self, value):
        if (isinstance(value, int) or (isinstance(value, str) and value.isdigit())) and int(value) >= 0:
            return True
        return False
    
    def valid_price(self, minPrice, maxPrice):
        if self.is_positive_int(minPrice) and self.is_positive_int(maxPrice) and int(maxPrice) < int(minPrice):
            return False
        return True

    def verify(self, params, results):
        if not params.get('search'):
            self.set_error('search', 'this is mandatory field', results)
        if params.get('page') and not self.is_positive_int(params['page']):
            self.set_error('page', 'this must be a positive integer', results)
        if params.get('pages') and not self.is_positive_int(params['pages']):
            self.set_error('pages', 'this must be a positive integer', results)
        if params.get('sort') and params['sort'] not in self.sort_choices:
            message = 'only '
            for choice in self.sort_choices:
                message += f'"{choice}", '
            self.set_error('sort', message[:-2] + ' are allowed', results)
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
        pass

    def scrape(self, params):
        pass
    
    def products(self, params):
        results = self.default.copy()
        if not self.verify(params, results):
            return results
        
        parsed = self.parse(params)
        results['data'] = self.scrape(parsed)
        return results

    def categories(self):
        pass

