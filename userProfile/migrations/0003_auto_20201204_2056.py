# Generated by Django 3.1.4 on 2020-12-04 15:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('userProfile', '0002_auto_20201204_2044'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='data',
            field=models.JSONField(null=True),
        ),
    ]