from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.core.exceptions import ObjectDoesNotExist

from products.models import Product
from products.serializers import ProductSerializer
from project.response import Response as Result

class ProductView(APIView):
    queryset = Product.objects.all()

    def get(self, request):
        result = Result()
        data = result.result

        products = self.queryset.all()
        data['data']['products'] = ProductSerializer(products, many=True).data
        data['data']['count'] = len(data['data']['products'])

        return Response(data, status.HTTP_200_OK)
    
    def delete(self, request):
        result = Result()
        data = result.result

        if not request.user.is_staff:
            result.set_error('delete', result.get_message('unauthorised'))
            return Response(data, status.HTTP_401_UNAUTHORIZED)
        
        try:
            product = Product.objects.get(pk=request.GET.get('id'))
            product.delete()
            result.set_error('delete', result.get_message('success'))
            return Response(data, status.HTTP_200_OK)
        
        except ObjectDoesNotExist:
            result.set_error('product', result.get_message('does_not_exist'))
            return Response(data, status.HTTP_200_OK)

        except Exception:
            result.set_error('delete', result.get_message('error'))
            return Response(data, status.HTTP_400_BAD_REQUEST)
