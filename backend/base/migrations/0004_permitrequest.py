# Generated by Django 4.2.5 on 2023-10-09 07:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0003_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='PermitRequest',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('department', models.CharField(max_length=255)),
                ('form', models.CharField(max_length=255)),
                ('username', models.CharField(max_length=255)),
                ('status', models.CharField(default='Pending', max_length=255)),
                ('date_submitted', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
