

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q
from  ..models import Article
from  ..serializers  import ArticleSerializer

@api_view(['GET'])
def  search_articles(request):
    query  =  request.GET.get('q','')
    if not query:
        return Response({'error': 'Query parameter "q" is required.'}, status=status.HTTP_400_BAD_REQUEST)
    
    articles =  Article.objects.filter(
        Q(title_icontains =  query) |  Q(conten_icontains  =  query)
    )
    serializer =  ArticleSerializer(articles,many =  True)
    return  Response(serializer.data)

