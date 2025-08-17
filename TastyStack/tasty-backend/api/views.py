from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework import status
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from .models import Favorite
from .serializers import FavoriteSerializer
from rest_framework.permissions import IsAuthenticated

from rest_framework.permissions import AllowAny

class RegisterView(APIView):
    authentication_classes = []  # 🔑 No authentication required
    permission_classes = [AllowAny]  # 🔓 Allow anyone to access

    def post(self, request):
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')
        
        if not username or not email or not password:
            return Response({"error": "All fields are required."}, status=400)
        
        try:
            validate_email(email)
        except ValidationError:
            return Response({"error": "Invalid email format."}, status=400)
        
        if User.objects.filter(username=username).exists():
            return Response({"error": "Username already exists."}, status=400)
        
        if User.objects.filter(email=email).exists():
            return Response({"error": "Email already exists."}, status=400)
        
        try:
            user = User.objects.create_user(username=username, email=email, password=password)
            token, _ = Token.objects.get_or_create(user=user)
            return Response({"token": token.key, "message": "Registration Successful"})
        except Exception as e:
            return Response({"error": str(e)}, status=500)


from rest_framework.authentication import BasicAuthentication
from rest_framework.permissions import AllowAny

class LoginView(APIView):
    authentication_classes = []  # <- Add this
    permission_classes = [AllowAny]  # <- Add this

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user is not None:
            token, _ = Token.objects.get_or_create(user=user)
            return Response({"token": token.key})
        return Response({"error": "Invalid credentials"}, status=400)

# ✅ Favorite Toggle View (Fixed permission_classes)
class FavoriteToggleView(APIView):
    permission_classes = [IsAuthenticated]  # ✅ FIXED

    def post(self, request):
        recipe_id = request.data.get('recipe_id')
        user = request.user

        favorite, created = Favorite.objects.get_or_create(user=user, recipe_id=recipe_id)
        if not created:
            favorite.delete()
            return Response({'message': 'Removed from favorites'})
        return Response({'message': 'Added to favorites'})

# ✅ Favorite List View
class FavoriteListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):  # ← change POST to GET
        favorites = Favorite.objects.filter(user=request.user)
        serializer = FavoriteSerializer(favorites, many=True)
        return Response(serializer.data)
