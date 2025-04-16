from django.db import models

from users.models import User
#from like.models import  Like

class Post(models.Model):
    user = models.ForeignKey(User, related_name='posts', on_delete=models.SET_NULL, null=True)
    content = models.TextField()
  #  likes= models.ForeignKey(Like,related_name='post',on_delete=models.SET_NULL, null=True)
    created_at = models.DateTimeField(auto_now_add=True)