from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST

from ..views import error, read_json


def signup_error(email, password):
    if not email or len(password) < 8:
        return 'Email and a password of at least 8 characters are required.'
    if User.objects.filter(username=email).exists():
        return 'An account with this email already exists.'
    return None


@csrf_exempt
@require_POST
def signup(request):
    data = read_json(request)
    email = data.get('email', '').strip().lower()
    password = data.get('password', '')
    message = signup_error(email, password)
    if message:
        return error(message)
    user = User.objects.create_user(username=email, email=email, password=password, first_name=data.get('name', '').strip())
    return JsonResponse({'id': user.id, 'email': user.email}, status=201)
