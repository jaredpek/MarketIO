from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

from search.general import General as GeneralScraper
from scrapers.aliexpress import AliExpress as AliExpressScraper
from scrapers.amazon import Amazon as AmazonScraper
from scrapers.ezbuy import EzBuy as EzBuyScraper
from scrapers.lazada import Lazada as LazadaScraper
from scrapers.qoo10 import Qoo10 as Qoo10Scraper

class ProductView(APIView):
    permission_classes = [AllowAny]
    
    def get_products(self, params, scraper):
        return scraper.products(params)
    
class General(ProductView):
    def get(self, request):
        results = self.get_products(request.GET, GeneralScraper())
        if results['status'] == 'error':
            return Response(results, status.HTTP_400_BAD_REQUEST)
        return Response(results, status.HTTP_200_OK)

class AliExpress(ProductView):
    def get(self, request):
        results = self.get_products(request.GET, AliExpressScraper())
        if results['status'] == 'error':
            return Response(results, status.HTTP_400_BAD_REQUEST)
        return Response(results, status.HTTP_200_OK)

class Amazon(ProductView):
    def get(self, request):
        results = self.get_products(request.GET, AmazonScraper())
        if results['status'] == 'error':
            return Response(results, status.HTTP_400_BAD_REQUEST)
        return Response(results, status.HTTP_200_OK)

class EzBuy(ProductView):
    def get(self, request):
        results = self.get_products(request.GET, EzBuyScraper())
        if results['status'] == 'error':
            return Response(results, status.HTTP_400_BAD_REQUEST)
        return Response(results, status.HTTP_200_OK)

class Lazada(ProductView):
    def get(self, request):
        results = self.get_products(request.GET, LazadaScraper())
        if results['status'] == 'error':
            return Response(results, status.HTTP_400_BAD_REQUEST)
        return Response(results, status.HTTP_200_OK)

class Qoo10(ProductView):
    def get(self, request):
        results = self.get_products(request.GET, Qoo10Scraper())
        if results['status'] == 'error':
            return Response(results, status.HTTP_400_BAD_REQUEST)
        return Response(results, status.HTTP_200_OK)
