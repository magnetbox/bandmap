# -*- coding: utf-8 -*-
# Generated by Django 1.9.4 on 2016-04-04 00:56
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('bands', '0006_auto_20160404_0055'),
    ]

    operations = [
        migrations.AlterField(
            model_name='album',
            name='location',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='bands.Location'),
        ),
    ]
