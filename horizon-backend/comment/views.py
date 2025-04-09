from rest_framework import viewsets

from comment.serializers import CommentSerializer
from models import Comment


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializers = CommentSerializer
