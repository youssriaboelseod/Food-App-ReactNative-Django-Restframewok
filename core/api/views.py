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
