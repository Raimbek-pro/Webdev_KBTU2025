from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Like

class ToggleLikeView(APIView):
    def post(self, request, post_id):
        user = request.user
        existing = Like.objects.filter(post_id=post_id, user=user)
        if existing.exists():
            existing.delete()
            return Response({'liked': False})
        like = Like(post_id=post_id, user=user)
        like.save()
        return Response({'liked': True, 'likes_count': Like.objects.filter(post_id=post_id).count()})
