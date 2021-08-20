from rest_framework import serializers
from django.contrib.auth.models import User
from . import models

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Category
        fields = ['id', 'name']
        
        
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Product
        fields = ['id', 'name', 'price', 'duration', 'description']
        
        
class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Order
        fields = ['__all__']
        

# Authenication's serializers
class SignInSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length = 255, required = True)
    password = serializers.CharField()
    
    
class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Customer
        fields = ['user_name', 'first_name', 'email', 'password']
        
        
class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Order
        fields = ['customer']
        
        
class OrderDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.OrderDetail
        fields = ['order', 'product', 'quantity']