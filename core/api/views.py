from django.shortcuts import render, get_object_or_404
from . import models
from . import serializers
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import action
from rest_framework import viewsets 
from rest_framework import permissions
from rest_framework import status
from rest_framework import generics


class ListCategoryView(APIView):
    serializer_class = serializers.CategorySerializer
    
    def get(self, request, format = None):
        categories = models.Category.objects.all()
        serializer = self.serializer_class(categories, many = True)
        return Response(serializer.data, status = status.HTTP_200_OK)
    
    
class ListProductsCategory(APIView):
    serializer_class = serializers.ProductSerializer
    
    def get_category_object(self, pk = None):
        return get_object_or_404(models.Category, id = pk)
    
    def post(self, request, format = None):
        categoryName = self.request.get('id')
        
    
    
class CategoryDetailView(APIView):
    serializer_class = serializers.CategorySerializer
    
    def get_object(self, pk = None):
        return get_object_or_404(models.Category, id = pk)
    
    def get(self, request, pk = None):
        categoryInstance = self.get_object(pk)
        if categoryInstance:
            serializer = self.serializer_class(categoryInstance)
            return Response(serializer.data, status = status.HTTP_200_OK)
        return Response('Category not found!', status = status.HTTP_404_NOT_FOUND)
    
    
