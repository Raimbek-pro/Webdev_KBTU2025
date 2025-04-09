from django.db import models

from users.models import User


class Subscription(models.Model):
    follower = models.ForeignKey(User, on_delete=models.CASCADE, related_name='followed')
    followed = models.ForeignKey(User, on_delete=models.CASCADE, related_name='followers')
    created_at = models.DateTimeField(auto_now_add=True)
    class Meta:
        unique_together = ('follower', 'followed')