from django.urls import path
from .views import PostViewSet,PostCreate,CommentCreate,CommentViewSet
from post.views import LikeToggleAPIView
urlpatterns=[
    path('', PostViewSet.as_view({'get': 'list'})),
    path('create',PostCreate.as_view()),
    path('comments',CommentViewSet.as_view({'get':'list'})),
    path('createcomment',CommentCreate.as_view()),
    path('posts/<int:post_id>/like-toggle/', LikeToggleAPIView.as_view(), name='like-toggle'),
]
