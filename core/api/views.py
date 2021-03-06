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
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.authentication import JWTAuthentication

# Authentication

class MiddlewareView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, format = None):
        return Response(request.user.email, status = status.HTTP_200_OK)
    

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
                    'access_token': str(refreshToken.access_token),
                    'email': str(User.email)
                }
                return Response(data, status = status.HTTP_200_OK)
            return Response('Email or password is incorrect!', status = status.HTTP_401_UNAUTHORIZED)
        return Response('Email or password is invalid!', status = status.HTTP_400_BAD_REQUEST)
    

class RegisterView(APIView):
    serializer_class = serializers.CustomerSerializer
    permission_classes = [permissions.AllowAny]
    
    def post(self, request, format = None):
        serializer = self.serializer_class(data = request.data)
        if serializer.is_valid():
            serializer.validated_data['password'] = make_password(serializer.validated_data['password'])
            serializer.save()
            return Response('Created new account!', status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    
    
class UpdatePasswordView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request, format = None):
        try:
            newPassword = request.data['pass']
            userInstance = request.user
            userInstance.set_password(newPassword)
            userInstance.save()
            return Response({'mes': 'Your password was updated!'}, status = status.HTTP_200_OK)
        except:
            return Response({'error': 'We are having some errors, please try later!'}, status = status.HTTP_400_BAD_REQUEST)
        
    

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
    
    def get_product_object_by_name(self, name = None):
        productInstance = models.Product.objects.filter(name = name)
        if len(productInstance) > 0:
            return productInstance[0]
        return -1
    
    def get_product_object_by_id(self, pk = None):
        productInstance = models.Product.objects.filter(id = pk)
        if len(productInstance) > 0:
            return productInstance[0]
        return -1
    
    def get(self, request, format = None):
        productName = self.request.query_params.get('name')
        if productName != None:
            productInstance = self.get_product_object_by_name(productName)
            if productInstance != -1:
                serializer = self.serializer_class(productInstance)
                return Response(serializer.data, status = status.HTTP_200_OK)
            return Response('Product not found!', status = status.HTTP_404_NOT_FOUND)
        else:
            productId = self.request.query_params.get('id')
            print(productId)
            productInstance = self.get_product_object_by_id(productId)
            if productInstance != -1:
                serializer = self.serializer_class(productInstance)
                return Response(serializer.data, status = status.HTTP_200_OK)
            return Response('Product not found!', status = status.HTTP_404_NOT_FOUND)
    
    
class OrderView(APIView):
    serializer_class = serializers.OrderSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request, format = None):
        customerInstance = get_object_or_404(models.Customer, email = request.user)
        try:
            newOrder = models.Order.objects.create(customer = customerInstance)
            newOrder.save()
            return Response({'order_id': newOrder.id}, status = status.HTTP_200_OK)
        except:
            return Response({'error': 'Error'})
        
        
class OrderDetailView(APIView):
    serializer_class = [serializers.OrderDetailSerializer]
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request, format = None):
        productName = self.request.data['product_name']
        orderId = self.request.data['order_id']
        quantity = self.request.data['quantity']
        print(orderId)
        productInstance = models.Product.objects.get(name = productName)
        orderInstance = models.Order.objects.get(id = orderId)
        newOrderDetail = models.OrderDetail.objects.create(order = orderInstance, quantity = quantity, product = productInstance)
        return Response('Created', status = status.HTTP_201_CREATED)
    
    
class FavoriteView(APIView):
    Serializer_class = serializers.FavoriteSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_product(self, name = None):
        productInstance = models.Product.objects.filter(name = name)
        if len(productInstance) > 0:
            return productInstance[0]
        return -1
    
    def get(self, request, format = None):
        productName = self.request.query_params.get('product-name')
        print(productName)
        productInstance = self.get_product(productName)
        if productInstance != -1:
            favoriteInstance = models.Favorite.objects.filter(product = productInstance)
            data = {
                'isLiked': False
            }
            if len(favoriteInstance) > 0:
                data = {
                    'isLiked': True
                }
            return Response(data, status = status.HTTP_200_OK)
        return Response('Product was not found!', status = status.HTTP_404_NOT_FOUND)
    
    
    def post(self, request, format = None):
        isLike = request.data['status']
        productName = request.data['product-name']
        productInstance = models.Product.objects.filter(name = productName)
        if isLike == False:
            favoriteInstance = models.Favorite.objects.filter(product = productInstance[0], customer = request.user)
            favoriteInstance[0].delete()
            print('delete')
            return Response('Deleted!', status = status.HTTP_200_OK)
        models.Favorite.objects.create(customer = request.user, product = productInstance[0])
        return Response('Created!', status = status.HTTP_201_CREATED)
    
    
class FavoriteProductsView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = serializers.ProductSerializer    
    
    def get(self, request, format = None):
        userInstance = request.user
        favorites = models.Favorite.objects.filter(customer = userInstance)
        data = []
        for favorite in favorites:
            data.append(favorite.product)
        serializer = self.serializer_class(data, many = True)
        return Response(serializer.data, status = status.HTTP_200_OK)
            
            
class UserInformationView(APIView):
    serializer_class = serializers.CustomerSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request, format = None):
        userInstance = request.user
        serializer = self.serializer_class(userInstance)
        return Response(serializer.data, status = status.HTTP_200_OK)
        
    
