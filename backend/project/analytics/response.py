from analytics.metrics import Metric
from project.response import Response as Result

class Response():
    def get(self, products):
        result = Result()
        data = result.result
        
        if not products or not len(products):
            result.set_error('products', result.messages['no_objects'])
            return data
        
        data['data']['analytics'] = {}
        for metric in ['price', 'rating']:
            data['data']['analytics'][metric] = Metric(products, metric).compute()
        return data
