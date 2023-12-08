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
    
    def post(self, request, *args, **kwargs):
        result = Result()
        data = result.result

        serializer = ProductSerializer(data=request.data)
        if not serializer.is_valid():
            for field in serializer.errors:
                result.set_error(field, serializer.errors[field], many=True)
            return Response(data, status.HTTP_400_BAD_REQUEST)
        
        serializer.create(request.data)
        result.set_message('create', result.messages['success'])
        return Response(data, status.HTTP_200_OK)
    
    def delete(self, request):
        result = Result()
        data = result.result

        if not request.user.is_staff:
            result.set_error('delete', result.messages['unauthorised'])
            return Response(data, status.HTTP_401_UNAUTHORIZED)
        
        try:
            product = Product.objects.get(pk=request.GET.get('id'))
            product.delete()
            result.set_error('delete', result.messages['success'])
            return Response(data, status.HTTP_200_OK)
        
        except ObjectDoesNotExist:
            result.set_error('product', result.messages['does_not_exist'])
            return Response(data, status.HTTP_200_OK)

        except Exception:
            result.set_error('delete', result.messages['error'])
            return Response(data, status.HTTP_400_BAD_REQUEST)
