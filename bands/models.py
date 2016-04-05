from __future__ import unicode_literals

from django.db import models
from django.utils import timezone
from rest_framework import serializers

import datetime

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
    location = models.ForeignKey(Location)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name

class Album(models.Model):
    name = models.CharField(max_length=400)
    year = models.IntegerField()
    sales = models.IntegerField()
    location = models.ForeignKey(Location, null=True, blank=True)
    band = models.ForeignKey(Band)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
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

