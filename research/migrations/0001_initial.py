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
                ('id', models.AutoField(auto_created=True, verbose_name='ID', primary_key=True, serialize=False)),
                ('app_name', models.CharField(max_length=32)),
                ('event_type', models.CharField(max_length=15)),
                ('params', models.TextField()),
                ('is_sent', models.NullBooleanField()),
                ('creation_time', models.DateTimeField(default=django.utils.timezone.now)),
            ],
        ),
        migrations.CreateModel(
            name='Configuration',
            fields=[
                ('school_id', models.CharField(max_length=36, primary_key=True, serialize=False)),
                ('state', models.CharField(max_length=32, null=True)),
                ('district', models.CharField(max_length=32, null=True)),
                ('terminal_id', models.CharField(null=True, max_length=6)),
                ('creation_time', models.DateTimeField(default=django.utils.timezone.now)),
            ],
        ),
        migrations.CreateModel(
            name='Fingerprint',
            fields=[
                ('id', models.AutoField(auto_created=True, verbose_name='ID', primary_key=True, serialize=False)),
                ('user_agent', models.CharField(max_length=200)),
                ('screen_size', models.CharField(null=True, max_length=12)),
                ('browser_url', models.CharField(null=True, max_length=200)),
                ('languages', models.CharField(null=True, max_length=50)),
                ('client_ip', models.CharField(null=True, max_length=15)),
                ('client_ip_other', models.CharField(null=True, max_length=15)),
                ('server_ip', models.CharField(null=True, max_length=15)),
                ('is_sent', models.NullBooleanField()),
                ('creation_time', models.DateTimeField(default=django.utils.timezone.now)),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(verbose_name='ID', primary_key=True, serialize=False, auto_created=True)),
                ('user_type', models.CharField(max_length=15, null=True)),
                ('user_count', models.CharField(max_length=2, null=True)),
                ('creation_time', models.DateTimeField(default=django.utils.timezone.now)),
                ('session_id', models.ForeignKey(related_name='users', to='research.UUID')),
            ],
        ),
        migrations.CreateModel(
            name='UUID',
            fields=[
                ('session_id', models.CharField(max_length=36, primary_key=True, serialize=False)),
                ('creation_time', models.DateTimeField(default=django.utils.timezone.now)),
            ],
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
        migrations.AddField(
            model_name='uuid',
            name='configuration',
            field=models.ForeignKey(related_name='configurations', to='research.Configuration'),
        ),
    ]
