from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.core.exceptions import ObjectDoesNotExist

from project.response import Response as Result
from django.db.utils import IntegrityError
from watchlists.models import WatchlistItem
from watchlists.serializers import WatchlistItemViewSerializer, WatchlistItemAddSerializer

class WatchlistView(APIView):
    queryset = WatchlistItem.objects.all()

    def get(self, request):
        result = Result()
        data = result.result

        user = request.user
        if not user:
            result.set_error('user', result.messages['unauthenticated'])
            return Response(data, status.HTTP_400_BAD_REQUEST)
        
        items = self.queryset.filter(user=user)
        data['data']['items'] = WatchlistItemViewSerializer(items, many=True).data
        data['data']['count'] = len(data['data']['items'])
        return Response(data, status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        result = Result()
        data = result.result

        request.data.update({'user': request.user.id})
        serializer = WatchlistItemAddSerializer(data=request.data)
        if not serializer.is_valid():
            result.set_error('product', result.messages['does_not_exist'])
            return Response(data, status.HTTP_400_BAD_REQUEST)
        
        try:
            serializer.create(request.data)
            result.set_message('create', result.messages['success'])
            return Response(data, status.HTTP_200_OK)
        
        except IntegrityError:
            result.set_error('create', result.messages['already_exists'])
            return Response(data, status.HTTP_400_BAD_REQUEST)
        
        except Exception:
            result.set_error('create', result.messages['error'])
            return Response(data, status.HTTP_400_BAD_REQUEST)
  
    def delete(self, request, *args, **kwargs):
        result = Result()
        data = result.result

        try:
            item = WatchlistItem.objects.get(pk=request.GET.get('id'))
            if item.user != request.user:
                result.set_error('remove', result.messages['unauthorised'])
                return Response(data, status.HTTP_401_UNAUTHORIZED)
            
            item.delete()
            result.set_message('remove', result.messages['success'])
            return Response(data, status.HTTP_200_OK)
        
        except ObjectDoesNotExist:
            result.set_error('item', result.messages['does_not_exist'])
            return Response(data, status.HTTP_400_BAD_REQUEST)

        except Exception:
            result.set_error('remove', result.messages['error'])
            return Response(data, status.HTTP_400_BAD_REQUEST)
