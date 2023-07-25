# Generated by Django 4.2.3 on 2023-07-24 18:06

import app.models
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Category_name', models.CharField(max_length=30)),
                ('Description', models.CharField(max_length=30)),
                ('Emojis', models.CharField(max_length=30)),
            ],
        ),
        migrations.CreateModel(
            name='Expenses',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('PlaceName', models.CharField(max_length=20)),
                ('Items', models.CharField(max_length=200)),
                ('Catogries', models.CharField(max_length=20)),
                ('Amount', models.FloatField(max_length=15)),
            ],
        ),
        migrations.CreateModel(
            name='Recipet',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('PlaceName', models.CharField(max_length=30)),
                ('Amount', models.FloatField(max_length=10)),
                ('Image', models.ImageField(blank=True, null=True, upload_to=app.models.upload_to)),
                ('Categoty', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='category', to='app.category')),
            ],
        ),
    ]
