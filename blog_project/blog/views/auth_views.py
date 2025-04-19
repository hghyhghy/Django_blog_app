

from  django.contrib.auth.models import  User
from django.contrib.auth import authenticate, login
from django.views.decorators.csrf import csrf_exempt
from django.http import  JsonResponse
import json  

@csrf_exempt
def register(request):
    if request.method =='POST':
        data = json.loads(request.body)
        username =  data.get('username')
        email =  data.get('email')
        password =  data.get('password')
        
        if not username  or not  email or not  password:
            return  JsonResponse({'error':'All fields are required'},status=400)
        
        if  User.objects.filter(username = username).exists():
            return  JsonResponse({'error':'Username already exists'},status=400)
        
        User.objects.create_user(username=username,email=email,password=password)
        return  JsonResponse({'message': 'User registered successfully'})

@csrf_exempt
def login_user(request):
    if request.method  == 'POST':
        data =  json.loads(request.body)
        username  =  data.get('username')
        password =  data.get('password')
        
        user  = authenticate(username=username,password=password)
        if user is not None:
            login(request,user)
            return JsonResponse({'message': 'Login successful'})
        
        return JsonResponse({'error': 'Invalid credentials'}, status=401)


