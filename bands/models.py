from __future__ import unicode_literals

from django.db import models
from django.utils import timezone
from rest_framework import serializers

import datetime
from cities.models import Place, Country, City

class Location(models.Model):
    name = models.CharField(max_length=400)
    latitude = models.FloatField()
    longitude = models.FloatField()

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name

class Band(models.Model):
    name = models.CharField(max_length=400)
    location = models.ForeignKey(City, null=True, blank=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name

class Album(models.Model):
    year = models.IntegerField()
    name = models.CharField(max_length=400)
    band = models.ForeignKey(Band)
    sales = models.IntegerField()
    location = models.ForeignKey(City, null=True, blank=True)

    class Meta:
        ordering = ['year','sales']

    def __str__(self):
        return self.name

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        # fields = ('name','latitude','longitude')

class BandSerializer(serializers.ModelSerializer):
    location = LocationSerializer(read_only=True)

    class Meta:
        model = Band
        # fields = ('name','location')

class AlbumSerializer(serializers.ModelSerializer):
    band = BandSerializer(read_only=True)
    location = LocationSerializer(read_only=True)

    class Meta:
        model = Album
        # fields = ('name','year','sales','location','band')

