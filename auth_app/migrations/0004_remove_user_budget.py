# Generated by Django 4.2.3 on 2023-07-20 14:01

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('auth_app', '0003_alter_user_budget'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='budget',
        ),
    ]
