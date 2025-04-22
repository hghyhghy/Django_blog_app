
import  re  
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q
from  ..models import Article
from  ..serializers  import ArticleSerializer

def normalize (  text ):
    return re.sub(r'\s+', ' ', text).strip().lower()

@api_view(['GET'])
def  search_articles(request):
    query  =  request.GET.get('q','')
    if not query:
        return Response({'error': 'Query parameter "q" is required.'}, status=status.HTTP_400_BAD_REQUEST)
    
    normalized_query =  normalize(query)
    all_articles  =  Article.objects.all()
    articles  = [
        
        article for article in  all_articles
        if normalized_query in  normalize(article.title)  or normalized_query in  normalize(article.content)
    ]
    serializer =  ArticleSerializer(articles,many =  True)
    return  Response(serializer.data)

