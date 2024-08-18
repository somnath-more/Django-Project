# parking/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, VehicleViewSet, ParkingSessionViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'vehicles', VehicleViewSet)
router.register(r'parking-sessions', ParkingSessionViewSet)

urlpatterns = [
    path('', include(router.urls)),
]