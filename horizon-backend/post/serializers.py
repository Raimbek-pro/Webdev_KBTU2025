from rest_framework import serializers

from .models import Post
from .models import Comment
class PostSerializer(serializers.ModelSerializer):
    like_count = serializers.SerializerMethodField()
    class Meta:
        model = Post
        fields = "__all__"
        extra_fields = ['like_count']
    def get_like_count(self, obj):
        return obj.likes.count()

class CommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = "__all__"