from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Like

class ToggleLikeView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, post_id):
        user = request.user
        existing = Like.objects.filter(post_id=post_id, user=user)
        if existing.exists():
            existing.delete()
            return Response({'liked': False})
        like = Like(post_id=post_id, user=user)
        like.save()
        return Response({'liked': True})
