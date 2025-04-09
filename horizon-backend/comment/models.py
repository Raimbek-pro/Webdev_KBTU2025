from django.db import models

from post.models import Post
from users.models import User


class Comment(models.Model):
    user = models.ForeignKey(User, related_name='comments', on_delete=models.SET_NULL, null=True)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)