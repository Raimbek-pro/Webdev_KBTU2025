from django.db import models

from users.models import User


class Post(models.Model):
    user = models.ForeignKey(User, related_name='posts', on_delete=models.SET_NULL, null=True)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
