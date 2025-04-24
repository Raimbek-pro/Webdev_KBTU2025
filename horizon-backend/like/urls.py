from django.urls import path

from like.views import ToggleLikeView

urlpatterns=[
    path('', ToggleLikeView.as_view(), name='toggle-like'),
]
