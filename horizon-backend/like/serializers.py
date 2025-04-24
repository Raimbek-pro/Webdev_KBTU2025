
from rest_framework import serializers
from .models import Like

class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = ['id', 'post', 'user']
        read_only_fields = ['id', 'user']
