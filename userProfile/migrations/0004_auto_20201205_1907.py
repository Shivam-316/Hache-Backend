# Generated by Django 3.1.4 on 2020-12-05 13:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('userProfile', '0003_auto_20201204_2056'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='data',
            field=models.TextField(blank=True, null=True),
        ),
    ]