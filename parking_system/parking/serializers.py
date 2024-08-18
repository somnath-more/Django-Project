# parking/serializers.py

from rest_framework import serializers
from .models import User, Vehicle, ParkingSession

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'password']

class VehicleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vehicle
        fields = ['id', 'number', 'make', 'model', 'user']

class ParkingSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ParkingSession
        fields = ['id', 'vehicle', 'check_in_time', 'check_out_time', 'amount_due']
