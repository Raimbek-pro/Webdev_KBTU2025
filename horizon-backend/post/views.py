from rest_framework import viewsets
from .models import Post
from post.serializers import PostSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Comment
from post.serializers import CommentSerializer
from rest_framework import status
from rest_framework import viewsets
from .models import Post
from post.serializers import PostSerializer

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def get_serializer_context(self):
        ctx = super().get_serializer_context()
        ctx['request'] = self.request
        return ctx

class PostCreate(APIView):
    def post(self,request):
        serializer=PostSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=request.user)
        return Response(serializer.data)


class CommentCreate(APIView):
    def post(self, request):
        serializer = CommentSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
class CommentViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def get_queryset(self):
        post_id = self.request.query_params.get('post')
        if post_id is not None:
            return self.queryset.filter(post__id=post_id)
        return self.queryset

