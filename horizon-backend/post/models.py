from django.db import models

from users.models import User

class Post(models.Model):
    user = models.ForeignKey(User, related_name='posts', on_delete=models.SET_NULL, null=True)
    title = models.TextField()
    content = models.TextField()
    image = models.ImageField(upload_to='post_images/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)


class Comment(models.Model):
    post = models.ForeignKey(Post, related_name='comments_for_post', on_delete=models.CASCADE)
    user = models.ForeignKey(User, related_name='comments_by_user', on_delete=models.SET_NULL, null=True)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Comment by {self.user} on {self.post}'