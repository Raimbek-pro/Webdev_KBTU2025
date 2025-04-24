from users.serializers import UserSerializer
from .models import Comment
from rest_framework import serializers
from .models import Post


class PostSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    likes_count = serializers.IntegerField(
        source='likes.count',
        read_only=True
    )
    comments_count = serializers.IntegerField(
        source='comments_for_post.count',
        read_only=True
    )

    liked = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ['id', 'user', 'title', 'content',
                  'image', 'created_at',
                  'likes_count', 'comments_count',
                  'liked']
        read_only_fields = ['id', 'user', 'created_at',
                            'likes_count', 'comments_count', 'liked']

    def get_liked(self, obj):
        request = self.context.get('request')
        if not request or request.user.is_anonymous:
            return False
        return obj.likes.filter(user=request.user).exists()


class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = Comment
        fields = ['id', 'post', 'user', 'content', 'created_at']
        read_only_fields = ['id', 'user', 'created_at']
