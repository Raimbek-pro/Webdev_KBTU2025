from django.urls import path
from .views import PostViewSet,PostCreate

urlpatterns=[
    path('', PostViewSet.as_view({'get': 'list'})),
    path('create',PostCreate.as_view())
]
