from django.shortcuts import render
from .models import Album, AlbumSerializer
from django.core import serializers
import logging
import json

YEAR_CHOICES = []
for r in range(1955, 2015):
    YEAR_CHOICES.append(r)

def index(request):
	data = []
	year_query = request.GET.get('year', None)
	if year_query:
		albums = Album.objects.filter(year=year_query).all()
	else:
		albums = Album.objects.all()
	serializer = AlbumSerializer(instance=albums, many=True)
	json_data = json.dumps(serializer.data)
	return render(request, 'index.html', {'years': YEAR_CHOICES, 'yearquery': year_query, 'albums': json_data})

