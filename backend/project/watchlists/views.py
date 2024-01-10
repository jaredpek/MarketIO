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
            result.set_error('user', result.get_message('unauthenticated'))
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
            for error in serializer.errors:
                result.set_error(error, serializer.errors[error][0])
            return Response(data, status.HTTP_400_BAD_REQUEST)
        
        try:
            serializer.create(request.data)
            result.set_message('watchlist add', result.get_message('success'))
            return Response(data, status.HTTP_200_OK)
        except Exception:
            result.set_error('watchlist add', result.get_message('exists'))
            return Response(data, status.HTTP_400_BAD_REQUEST)

  
    def delete(self, request, *args, **kwargs):
        result = Result()
        data = result.result

        try:
            item = WatchlistItem.objects.get(pk=request.GET.get('id'))
            if item.user != request.user:
                result.set_error('remove', result.get_message('unauthorised'))
                return Response(data, status.HTTP_401_UNAUTHORIZED)
            
            item.delete()
            result.set_message('remove', result.get_message('success'))
            return Response(data, status.HTTP_200_OK)
        
        except ObjectDoesNotExist:
            result.set_error('item', result.get_message('does_not_exist'))
            return Response(data, status.HTTP_400_BAD_REQUEST)

        except Exception:
            result.set_error('remove', result.get_message('error'))
            return Response(data, status.HTTP_400_BAD_REQUEST)
