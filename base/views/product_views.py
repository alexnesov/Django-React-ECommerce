from rest_framework.decorators import api_view
from rest_framework.response import Response

from base.models import Product

from base.serializers import ProductSerializer




@api_view(['GET'])
def getProducts(request):

    # just returns all products from our database
    products        = Product.objects.all()
    serializer      = ProductSerializer(products, many=True)

    return Response(serializer.data) # response from DB



@api_view(['GET'])
def getProduct(request, pk):
    """
    """
    product         = Product.objects.get(_id = pk)
    serializer      = ProductSerializer(product, many=False)

    return Response(serializer.data)
