from django.contrib import admin
from .models import News

@admin.register(News)
class NewsAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'created_at', 'updated_at')
    search_fields = ('title', 'content')
    list_filter = ('created_at',)
    ordering = ('-created_at',)

    fields = ('title', 'content', 'image', 'created_at', 'updated_at')
    readonly_fields = ('created_at', 'updated_at')
