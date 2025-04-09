from rest_framework import viewsets

from models import Post
from post.serializers import PostSerializer


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializers = PostSerializer
