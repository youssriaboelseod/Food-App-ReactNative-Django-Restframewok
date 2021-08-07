from django.urls import path
from . import views

urlpatterns = [
    path('list-categories/', views.ListCategoryView.as_view(), name = 'list-categories'),
    path('detail-product/<str:pk>/', views.CategoryDetailView.as_view(), name = 'detail-products')
]
