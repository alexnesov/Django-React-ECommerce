import imp
from django.shortcuts import render
from django.http import JsonResponse
from.products import products
from rest_framework.decorators import api_view
from rest_framework.response import Response



from .models import Product
from .products import products
from .serializers import ProductSerializer


@api_view(['GET'])
def getRoutes(request):

    routes = [
        '/api/products/',
        '/api/products/create/',
        '/api/products/upload/',
        '/api/products/<id>/reviews/',
        '/api/products/top/',
        '/api/products/<id>/',
        '/api/products/delete/<id>',
        '/api/products/<update>/<id>',
    ]
    return Response(routes)

@api_view(['GET'])
def getProducts(request):

    # just returns all products from our database
    products        = Product.objects.all()
    serializer      = ProductSerializer(products, many=True)

    print("serializer: ")
    print(serializer)
    return Response(serializer.data) # response from DB



@api_view(['GET'])
def getProduct(request, pk):
    for i in products:
        if i['_id'] == pk:
            product = i
            break

    return Response(product)
