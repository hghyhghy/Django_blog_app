

from django.contrib.auth.models import User
from django.contrib.auth  import authenticate,login
from  django.views.decorators.csrf import csrf_exempt
from django.http  import  JsonResponse
import json

@csrf_exempt
def register(request):
    if request.method == 'POST':
        data   = json.loads(request.body)
        username   =  data.get('username')
        email   =  data.get('email')
        password   =  data.get('password')

        if not username or not email or not  password:
            return  JsonResponse({'message':'All  fields are required'})
        
        if User.objects.filter(username=username).exists():
            return JsonResponse({'message':'User with  this username already exists'})
        
        User.objects.create_user(username=username,email=email,password=password)
        return  JsonResponse({'message':'user object created successfully'})
    

@csrf_exempt
def login_user(request):
    if request.method == 'POST':
        data =  json.loads(request.body)
        username  = data.get('username')
        password  = data.get('password')

        user   =  authenticate(username=username,password=password)
        if user is not None:
            login(request,user)
            return JsonResponse({'message':'Login successful'})

        return  JsonResponse({'message':'Invalid credentials'})

