from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class Favorite(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    recipe_id = models.IntegerField()


    class Meta:
        unique_together = ('user','recipe_id')