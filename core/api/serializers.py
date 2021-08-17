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