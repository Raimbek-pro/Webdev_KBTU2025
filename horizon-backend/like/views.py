from rest_framework import viewsets

from like.serializers import LikeSerializer
from models import Like


class LikeViewSet(viewsets.ModelViewSet):
    queryset = Like.objects.all()
    serializers = LikeSerializer