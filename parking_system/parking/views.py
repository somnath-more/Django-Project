from django.shortcuts import render

# Create your views here.
# parking/views.py

from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import User, Vehicle, ParkingSession
from .serializers import UserSerializer, VehicleSerializer, ParkingSessionSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class VehicleViewSet(viewsets.ModelViewSet):
    queryset = Vehicle.objects.all()
    serializer_class = VehicleSerializer

class ParkingSessionViewSet(viewsets.ModelViewSet):
    queryset = ParkingSession.objects.all()
    serializer_class = ParkingSessionSerializer

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)

    def perform_update(self, serializer):
        serializer.save()
