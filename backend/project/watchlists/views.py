from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from project.response import Response as BaseResponse
from watchlists.models import WatchlistItem
from watchlists.serializers import WatchlistItemViewSerializer, WatchlistItemAddSerializer

class GetView(APIView, BaseResponse):
    queryset = WatchlistItem.objects.all()

    def get(self, request):
        result = self.default.copy()
        user = request.user
        if not user:
            self.set_error('user', 'must be logged in to view watchlist', 'result')
            return Response(result, status.HTTP_400_BAD_REQUEST)
        
        items = self.queryset.filter(user=user)
        data = WatchlistItemViewSerializer(items, many=True).data
        result['data'] = data
        return Response(result, status.HTTP_200_OK)

class AddView(APIView, BaseResponse):
    def post(self, request, *args, **kwargs):
        result = self.default.copy()
        serializer = WatchlistItemAddSerializer(data=request.data)
        if not serializer.is_valid():
            print(serializer.errors)
            return Response(result, status.HTTP_400_BAD_REQUEST)
        item = WatchlistItem.objects.create(request.data)
        
    

class RemoveView(APIView, BaseResponse):
    def delete(self, request, *args, **kwargs):
        result = self.default.copy()
        return Response(result, status.HTTP_200_OK)


