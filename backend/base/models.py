from django.db import models
from django.contrib.auth.models import User

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
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=None)
    department = models.CharField(max_length=255)
    form = models.CharField(max_length=255)
    file = models.FileField(upload_to='uploads/', default='default_file.txt')
    date_submitted = models.DateField(auto_now_add=True)
    # change the status in the crm, and then change the status here! need notif api or something!
    status = models.CharField(max_length=20, default='In Progress')

class UserNew (models.Model):  ## version of user with id
    ## i think the foreign key is usernew
    
