from django.contrib import admin

# Register your models here.
from .models import Band
from .models import Location
from .models import Album

class LocationAdmin(admin.ModelAdmin):
    list_display = ('name', 'latitude', 'longitude')

class BandAdmin(admin.ModelAdmin):
    list_display = ('name', 'location')
    raw_id_fields = ('location',)

class AlbumAdmin(admin.ModelAdmin):
    list_display = ('name', 'band', 'year', 'sales', 'location')
    raw_id_fields = ('location',)

admin.site.register(Band, BandAdmin)
admin.site.register(Location, LocationAdmin)
admin.site.register(Album, AlbumAdmin)
