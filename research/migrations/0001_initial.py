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
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('app_name', models.CharField(max_length=32)),
                ('event_type', models.CharField(max_length=32)),
                ('params', models.TextField()),
                ('is_sent', models.NullBooleanField()),
                ('creation_time', models.DateTimeField(default=django.utils.timezone.now)),
            ],
        ),
        migrations.CreateModel(
            name='Configuration',
            fields=[
                ('school_id', models.CharField(primary_key=True, serialize=False, max_length=36)),
                ('terminal_id', models.CharField(max_length=6, null=True)),
                ('creation_time', models.DateTimeField(default=django.utils.timezone.now)),
            ],
        ),
        migrations.CreateModel(
            name='Fingerprint',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('user_agent', models.CharField(max_length=200)),
                ('screen_size', models.CharField(max_length=12, null=True)),
                ('browser_url', models.CharField(max_length=200, null=True)),
                ('languages', models.CharField(max_length=50, null=True)),
                ('client_ip', models.CharField(max_length=15, null=True)),
                ('client_ip_other', models.CharField(max_length=15, null=True)),
                ('server_ip', models.CharField(max_length=15, null=True)),
                ('is_sent', models.NullBooleanField()),
                ('creation_time', models.DateTimeField(default=django.utils.timezone.now)),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('user_type', models.CharField(max_length=15, null=True)),
                ('user_count', models.CharField(max_length=2, null=True)),
                ('creation_time', models.DateTimeField(default=django.utils.timezone.now)),
            ],
        ),
        migrations.CreateModel(
            name='UUID',
            fields=[
                ('session_id', models.CharField(primary_key=True, serialize=False, max_length=36)),
                ('creation_time', models.DateTimeField(default=django.utils.timezone.now)),
                ('configuration', models.ForeignKey(default='NOTSET', to='research.Configuration', related_name='configuration')),
            ],
        ),
        migrations.AddField(
            model_name='user',
            name='session_id',
            field=models.ForeignKey(related_name='users', to='research.UUID'),
        ),
        migrations.AddField(
            model_name='fingerprint',
            name='session_id',
            field=models.ForeignKey(related_name='fingerprints', to='research.UUID'),
        ),
        migrations.AddField(
            model_name='appdata',
            name='session_id',
            field=models.ForeignKey(related_name='appdata', to='research.UUID'),
        ),
    ]
