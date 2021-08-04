from django.db import models
from django.utils import timezone
from django.conf import settings
from django.contrib.auth.models import User
from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser, PermissionsMixin
)

class MyUserManager(BaseUserManager):
    def create_user(self, email, user_name, first_name, password=None):
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            email=self.normalize_email(email),
            user_name = user_name,
            first_name = first_name
        )

        user.set_password(password)
        user.save(using = self._db)
        return user
    
    def create_superuser(self, email, user_name, first_name, password=None):
        user = self.create_user(
            email = email,
            user_name = user_name,
            first_name = first_name,
            password = password
        )
        user.is_admin = True
        user.is_superuser = True
        user.save(using = self._db)
        return user
    

class Customer(AbstractBaseUser):
    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
        unique=True,
    )
    user_name = models.CharField(max_length=255, unique=True, null=True)
    first_name = models.CharField(max_length=255, blank=True, null = True) 
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    objects = MyUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['user_name', 'first_name']

    def __str__(self):
        return str(self.email)

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        return self.is_admin
    
    def has_perm(self, perm, obj = None):
        return True

    def has_module_perms(self, app_label):
        return True    


class Category(models.Model):
    name = models.CharField(max_length = 50, blank = True)
    created_date = models.DateTimeField(auto_now_add = True)
    
    class Meta:
        ordering = ['created_date']
    
    def __str__(self):
        return str(self.name)
    
    
# class Product(models.Model):
#     name = models.CharField(max_length = 50, blank = True, null = False, unique = True)
#     category = models.ForeignKey(Category, on_delete = models.CASCADE, related_name = 'category_product')
#     is_available = models.BooleanField(default = True)
#     price = models.DecimalField(max_digits = 8, decimal_places = 2)
#     imgUrl = models.CharField(max_length = 255, null = True)
#     created_date = models.DateTimeField(auto_now_add = True)
    
#     class Meta:
#         ordering = ['is_available','-created_date']
        
#     def __str__(self):
#         return str(name)