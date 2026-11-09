from django.urls import path

from .sign_up_view import signup

urlpatterns = [
    path('signup', signup, name='signup'),
]
