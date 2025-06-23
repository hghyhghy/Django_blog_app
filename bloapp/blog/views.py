from django.shortcuts import render,get_object_or_404
from .models import Blog
import json 
from django.http  import  JsonResponse,HttpResponseNotAllowed
from django.views.decorators.csrf import csrf_exempt
from  .serializers import Blogserializers
from rest_framework.response import Response
from rest_framework.decorators  import  api_view
from  django.db.models  import Q

def get_blogs(request):
    if request.method=="GET":
        blog =  list(Blog.objects.values())
        return JsonResponse(blog,safe=False)

@csrf_exempt
def create_blog(request):
    if request.method == 'POST':
        data  =  json.loads(request.body)
        blogs =  Blog.objects.create(title=data['title'],content=data['content'])
        return JsonResponse({'id':blogs.id,'title':blogs.title,'content':blogs.content})
    return HttpResponseNotAllowed(['post'])

@csrf_exempt
def update_blog(request,blog_id):
    if request.method == 'PUT':
        data  =   json.loads(request.body)
        blog=  Blog.objects.get(id=blog_id)
        blog.title =  data['title']
        blog.content=data['content']
        blog.save()
        return JsonResponse({'message':'Updated'})

    return HttpResponseNotAllowed(['PUT'])

@csrf_exempt
def delete_blog(request,blog_id):
    if request.method == 'DELETE':
        blog=Blog.objects.get(id=blog_id)
        blog.delete()
        return JsonResponse({'message':'Blog deleted'})
    
    return HttpResponseNotAllowed(['DELETE'])


@api_view(['GET'])
@csrf_exempt
def get_blog_details(request,blog_id):
    blog =  Blog.objects.get(id=blog_id)
    serializer =  Blogserializers(blog)
    return Response(serializer.data)

#implementing search functionality

@api_view(['GET'])
@csrf_exempt
def search_blogs(request):
    query = request.GET.get('query','').strip()

    if query:
        blog  =  Blog.objects.filter(
            Q(title__icontains =  query) | Q(content__icontains=query)
        )
    else:
        blog =  Blog.objects.all()

    data = [{
        'id':b.id,
        'title':b.title,
        'content':b.content
    } for b in blog]

    return Response(data)