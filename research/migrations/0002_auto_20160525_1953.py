# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('research', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='AppData',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, primary_key=True, auto_created=True)),
                ('app_name', models.CharField(max_length=15)),
                ('event_type', models.CharField(max_length=15)),
                ('params', models.TextField()),
                ('is_sent'. models.NullBooleanField(null=True)),
                ('creation_time', models.DateTimeField(auto_now_add=True)),e
            ],
        ),
        migrations.CreateModel(
            name='UUID',
            fields=[
                ('session_id', models.CharField(serialize=False, max_length=36, primary_key=True)),
                ('creation_time', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.AddField(
            model_name='appdata',
            name='session_id',
            field=models.ForeignKey(to='research.UUID'),
        ),
    ]
