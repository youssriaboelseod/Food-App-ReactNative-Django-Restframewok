from rest_framework.serializers import Serializer
from . import models, serializers
from django.shortcuts import render, get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import action
from rest_framework import permissions, status
from django.conf import settings
from django.contrib.auth import authenticate
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

# Authentication

class SignInView(APIView):
    serializer_class = serializers.SignInSerializer
    permission_classes = [permissions.AllowAny]
    
    def post(self, request, format = None):
        serializer = self.serializer_class(data = self.request.data)
        if serializer.is_valid():
            User = authenticate(
                request,
                email = serializer.validated_data['email'],
                password = serializer.validated_data['password']
            )
            if User:
                refreshToken = TokenObtainPairSerializer.get_token(User)
                data = {
                    'refresh_token': str(refreshToken),
                    'access_token': str(refreshToken.access_token)
                }
                return Response(data, status = status.HTTP_200_OK)
            return Response('Email or password is incorrect!', status = status.HTTP_401_UNAUTHORIZED)
        return Response('Email or password is invalid!', status = status.HTTP_400_BAD_REQUEST)


class ListCategoryView(APIView):
    serializer_class = serializers.CategorySerializer
    permission_classes = [permissions.AllowAny]
    
    def get(self, request, format = None):
        categories = models.Category.objects.all()
        serializer = self.serializer_class(categories, many = True)
        return Response(serializer.data, status = status.HTTP_200_OK)
    
    
class CategoryDetailView(APIView):
    serializer_class = serializers.CategorySerializer
    permission_classes = [permissions.AllowAny]
    
    def get_object(self, pk = None):
        return get_object_or_404(models.Category, id = pk)
    
    def get(self, request, pk = None):
        categoryInstance = self.get_object(pk)
        if categoryInstance:
            serializer = self.serializer_class(categoryInstance)
            return Response(serializer.data, status = status.HTTP_200_OK)
        return Response('Category not found!', status = status.HTTP_404_NOT_FOUND)
    
    
class ListProductsCategory(APIView):
    serializer_class = serializers.ProductSerializer
    permission_classes = [permissions.AllowAny]
    
    def get_category_object(self, name = None):
        categoryInstances = models.Category.objects.filter(name = name)
        if len(categoryInstances) > 0:
            return categoryInstances[0]
        return -1
    
    def get(self, request, format = None):
        categoryName = self.request.query_params.get('name')
        categoryInstance = self.get_category_object(categoryName)
        if categoryName != -1:
            products = categoryInstance.category_product.all()
            serializer = self.serializer_class(products, many = True)
            return Response(serializer.data, status = status.HTTP_200_OK)
        return Response('Category not found!', status = status.HTTP_404_NOT_FOUND)
    
    
class DetailProductCategory(APIView):
    serializer_class = serializers.ProductSerializer
    permission_classes = [permissions.AllowAny]
    
    def get_product_object(self, name = None):
        productInstance = models.Product.objects.filter(name = name)
        if len(productInstance) > 0:
            return productInstance[0]
        return -1
    
    def get(self, request, format = None):
        productName = self.request.query_params.get('name')
        productInstance = self.get_product_object(productName)
        print('here')
        if productInstance != -1:
            serializer = self.serializer_class(productInstance)
            return Response(serializer.data, status = status.HTTP_200_OK)
        return Response('Product not found!', status = status.HTTP_404_NOT_FOUND)
    
    
class OrderView(APIView):
    serializer_class = serializers.OrderSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request, format = None):
        pass
    
    
