from django.urls import include, path

urlpatterns = [
    path('user_management/', include('web.user_management.urls')),
]
