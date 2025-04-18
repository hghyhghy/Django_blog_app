from django.db import models

# Create your models here.
from django.db import models

class Article(models.Model):
    title = models.CharField(max_length=200)
    content =  models.TextField()
    
    def __str__(self):
        return f"{self.title} = {self.content[:20]}.."
