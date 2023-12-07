from analytics.metrics import Metric
from project.response import Response as BaseResponse

class Response(BaseResponse):
    def get(self, products):
        results = self.default.copy()
        if not products or not len(products):
            self.set_error('products', 'no products to compute analytics', results)
            return results
        
        results['data']['analytics'] = {}
        for metric in ['price', 'rating']:
            results['data']['analytics'][metric] = Metric(products, metric).compute()
        return results
