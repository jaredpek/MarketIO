from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

class Metrics():
    def __init__(self, products):
        self.products = products
        products.sort(key=lambda product: product['price'])
    
    def minimum(self):
        return self.products[0]['price']

    def low_quartile(self):
        return self.products[len(self.products) * 0.25]['price']

    def mean(self):
        pass

    def median(self):
        pass

    def high_quartile(self):
        return self.products[len(self.products) * 0.75]['price']

    def maximum(self):
        return self.products[-1]['price']

class Analytics(APIView):
    def get(self, request):
        
        pass
