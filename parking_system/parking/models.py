from django.db import models

class User(models.Model):
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)

    def __str__(self):
        return self.email

class Vehicle(models.Model):
    number = models.CharField(max_length=20)
    make = models.CharField(max_length=50)
    model = models.CharField(max_length=50)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.number

class ParkingSession(models.Model):
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE)
    check_in_time = models.DateTimeField()
    check_out_time = models.DateTimeField(null=True, blank=True)
    amount_due = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    def __str__(self):
        return f"{self.vehicle.number} - {self.check_in_time}"
