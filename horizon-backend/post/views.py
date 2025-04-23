from rest_framework import viewsets
from .models import Post
from post.serializers import PostSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Comment
from post.serializers import CommentSerializer
from rest_framework import status
from like.models import Like
from rest_framework.permissions import AllowAny
from rest_framework.permissions import IsAuthenticated
import uuid
class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class PostCreate(APIView):
    def post(self,request):
        serializer=PostSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
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


class LikeToggleAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, post_id):
        try:
            post = Post.objects.get(id=post_id)
        except Post.DoesNotExist:
            return Response({"error": "Post not found."}, status=status.HTTP_404_NOT_FOUND)

        # Use a random identifier or session ID for unauthenticated users
        user_identifier = request.session.session_key if request.session.session_key else str(uuid.uuid4())

        # Use the actual user field, assuming there's a 'user' field in the Like model
        like, created = Like.objects.get_or_create(post=post, user=request.user)

        if not created:
            like.delete()
            liked = False
        else:
            liked = True

        return Response({
            "liked": liked,
            "likes_count": post.likes.count()
        }, status=status.HTTP_200_OK)