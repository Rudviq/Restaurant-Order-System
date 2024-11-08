from django.db import models

class Ingredient(models.Model):
    name = models.CharField(max_length=100)
    quantity = models.FloatField()
    expiry_date = models.DateField()
    unit = models.CharField(max_length=20)
    near_expiry_discount = models.BooleanField(default=False)

class MenuItem(models.Model):
    name = models.CharField(max_length=100)
    ingredients = models.ManyToManyField(Ingredient, through='MenuIngredient')

class Order(models.Model):
    menu_item = models.ForeignKey(MenuItem, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    timestamp = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=50, default='Pending')
