# -*- coding: utf-8 -*-
# Generated by Django 1.9.4 on 2016-04-01 03:15
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bands', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='album',
            name='name',
            field=models.CharField(max_length=400),
        ),
        migrations.AlterField(
            model_name='band',
            name='name',
            field=models.CharField(max_length=400),
        ),
        migrations.AlterField(
            model_name='location',
            name='name',
            field=models.CharField(max_length=400),
        ),
    ]
