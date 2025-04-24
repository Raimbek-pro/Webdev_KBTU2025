from django.urls import path

from .views import PostViewSet, PostCreate, CommentCreate, CommentViewSet

urlpatterns = [
    path('', PostViewSet.as_view({'get': 'list'})),
    path('create', PostCreate.as_view()),
    path('comments', CommentViewSet.as_view({'get': 'list'})),
    path('createcomment', CommentCreate.as_view())
]
