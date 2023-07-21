# Generated by Django 4.2.3 on 2023-07-21 19:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('auth_app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='address',
            field=models.CharField(blank=True, default='unknown', max_length=200),
        ),
        migrations.AlterField(
            model_name='user',
            name='budget',
            field=models.FloatField(blank=True, default=0.0),
        ),
        migrations.AlterField(
            model_name='user',
            name='email',
            field=models.CharField(blank=True, default='user@email.com', max_length=200),
        ),
        migrations.AlterField(
            model_name='user',
            name='first_name',
            field=models.CharField(blank=True, default='user', max_length=200),
        ),
        migrations.AlterField(
            model_name='user',
            name='last_name',
            field=models.CharField(blank=True, default='user', max_length=200),
        ),
    ]
