from django.urls import path
from search.views import General, AliExpress, Amazon, EzBuy, Lazada, Qoo10

urlpatterns = [
    path('', General.as_view()),
    path('aliexpress/', AliExpress.as_view()),
    path('amazon/', Amazon.as_view()),
    path('ezbuy/', EzBuy.as_view()),
    path('lazada/', Lazada.as_view()),
    path('qoo10/', Qoo10.as_view()),
]
