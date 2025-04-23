import os

import jwt
from decouple import Config, RepositoryEnv
from rest_framework import authentication, exceptions
from users.models import User

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
secrets_file = os.path.join(BASE_DIR, 'secrets.env')
config = Config(RepositoryEnv(secrets_file))

SECRET_KEY = config('SECRET_KEY')

class JWTAuthenticationFromCookie(authentication.BaseAuthentication):
    def authenticate(self, request):
        token = request.COOKIES.get('jwt')
        if not token:
            return None

        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise exceptions.AuthenticationFailed('Token has expired')
        except jwt.InvalidTokenError:
            raise exceptions.AuthenticationFailed('Invalid token')

        user = User.objects.filter(id=payload['id']).first()
        if not user:
            raise exceptions.AuthenticationFailed('User not found')

        return (user, token)
