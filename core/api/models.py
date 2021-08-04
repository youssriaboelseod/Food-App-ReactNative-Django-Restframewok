from django.db import models


class Category(models.Model):
    name = models.CharField(max_length = 50, blank = True, null = False, unique = True)
    created_date = models.DateTimeField(auto_now_add = True)
    
    class Meta:
        ordering = ['created_date']
    
    def __str__(self):
        return str(self.name)
    
    
class Product(models.Mode):
    name = models.CharField(max_length = 50, blank = True, null = False, unique = True)
    category = models.ForeignKey(Category, on_delete = models.CASCADE, related_name = 'category_product')
    is_available = models.BooleanField(default = True)
    price = models.DecimalField(max_digits = 8, decimal_places = 2)
    imgUrl = models.CharField(max_length = 255, null = True)
    created_date = models.DateTimeField(auto_now_add = True)
    
    class Meta:
        ordering = ['is_available','-created_date']
        
    def __str__(self):
        return str(name)