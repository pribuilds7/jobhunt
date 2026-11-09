import json

from django.http import JsonResponse


def read_json(request):
    try:
        return json.loads(request.body)
    except json.JSONDecodeError:
        return {}


def error(message, status=400):
    return JsonResponse({'message': message}, status=status)
