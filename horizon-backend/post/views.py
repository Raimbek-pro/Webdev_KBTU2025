from rest_framework import viewsets
from .models import Post
from post.serializers import PostSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class PostCreate(APIView):
    def post(self,request):
        serializer=PostSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
