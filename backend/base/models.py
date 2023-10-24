from django.db import models

# Create your models here.

class Contact(models.Model):
    DEPARTMENT_CHOICES = (
        ("City Hall", "City Hall"),
        ("Police Department", "Police Department"),
        ("Department of Public Works", "Department of Public Works"),
        ("Assessing Department", "Assessing Department"),
        ("Building Department", "Building Department"),
    )

    department = models.CharField(max_length=255, choices=DEPARTMENT_CHOICES)
    name = models.CharField(max_length=255)
    email = models.EmailField()
    content = models.TextField()

class PermitRequest(models.Model):
    department = models.CharField(max_length=255)
    form = models.CharField(max_length=255)
    file = models.FileField(upload_to ='uploads/')
    date_submitted = models.DateTimeField(auto_now_add=True)
