# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='AppData',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('app_name', models.CharField(max_length=15)),
                ('event_type', models.CharField(max_length=15)),
                ('params', models.TextField()),
                ('creation_time', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Fingerprint',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_agent', models.CharField(max_length=200)),
                ('screen_size', models.CharField(max_length=12, null=True)),
                ('browser_url', models.CharField(max_length=200, null=True)),
                ('languages', models.CharField(max_length=50, null=True)),
                ('client_ip', models.CharField(max_length=15, null=True)),
                ('client_ip_other', models.CharField(max_length=15, null=True)),
                ('server_ip', models.CharField(max_length=15, null=True)),
                ('creation_time', models.DateTimeField(default=django.utils.timezone.now)),
            ],
        ),
        migrations.CreateModel(
            name='UUID',
            fields=[
                ('uuid', models.UUIDField(primary_key=True, serialize=False)),
                ('creation_time', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.AddField(
            model_name='fingerprint',
            name='session_id',
            field=models.ForeignKey(to='research.UUID'),
        ),
        migrations.AddField(
            model_name='appdata',
            name='session_id',
            field=models.ForeignKey(to='research.Fingerprint'),
        ),
    ]
