from analytics.response import Response as AnalyticsResponse
from products.general import General
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

class Analytics(APIView):
    def get(self, request):
        params = {
            'search': request.GET.get('search'),
            'scrapers': request.GET.get('scrapers'),
            'pages': 5,
        }
        products_response = General().products(params)
        if products_response['status'] != 'success':
            return Response(products_response, status.HTTP_400_BAD_REQUEST)
        
        products = products_response['data']['products']
        analytics_response = AnalyticsResponse().get(products)
        if analytics_response['status'] != 'success':
            return Response(analytics_response, status.HTTP_400_BAD_REQUEST)
        return Response(analytics_response, status.HTTP_200_OK)
