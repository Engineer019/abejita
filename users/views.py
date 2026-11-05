from functools import lru_cache

from drf_yasg.utils import swagger_auto_schema
from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from zeep import Client
from zeep.helpers import serialize_object
from zeep.transports import Transport

from users.models import User
from users.serializers import RegisterUserSerializer, UserSerializer

SOAP_WSDL = (
    'http://webservices.oorsprong.org/websamples.countryinfo/'
    'CountryInfoService.wso?WSDL'
)


class UserApiViewSet(ModelViewSet):
    permission_classes = [IsAdminUser]
    serializer_class = UserSerializer
    queryset = User.objects.all()


class UserView(APIView):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(responses={200: UserSerializer})
    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)


class RegisterUserView(generics.CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = RegisterUserSerializer
    queryset = User.objects.all()


@lru_cache(maxsize=1)
def get_soap_client():
    # Descarga el WSDL una sola vez y reutiliza el cliente
    return Client(SOAP_WSDL, transport=Transport(timeout=15, operation_timeout=15))


class CountrySoapView(APIView):
    """Consulta un servicio SOAP público de países usando zeep."""
    permission_classes = [AllowAny]

    def get(self, request, iso_code):
        try:
            info = get_soap_client().service.FullCountryInfo(iso_code.upper())
        except Exception:
            return Response(
                {'detail': 'No se pudo consultar el servicio SOAP'},
                status=status.HTTP_502_BAD_GATEWAY,
            )
        return Response(serialize_object(info))