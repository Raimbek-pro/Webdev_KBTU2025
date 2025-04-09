from django.db import models

from post.models import Post
from users.models import User


class Like(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='likes')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='likes')
    class Meta:
        unique_together = ('post', 'user')
