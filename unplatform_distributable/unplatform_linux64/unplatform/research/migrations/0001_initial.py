# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import django.utils.timezone
import research.utils
import research.models


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='AppData',
            fields=[
                ('id', models.AutoField(primary_key=True, auto_created=True, verbose_name='ID', serialize=False)),
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
                ('state', models.CharField(null=True, max_length=32)),
                ('district', models.CharField(null=True, max_length=32)),
                ('school_id', models.CharField(primary_key=True, serialize=False, max_length=36)),
                ('terminal_id', models.CharField(null=True, max_length=6)),
                ('is_sent', models.NullBooleanField()),
                ('creation_time', models.DateTimeField(default=django.utils.timezone.now)),
            ],
        ),
        migrations.CreateModel(
            name='Fingerprint',
            fields=[
                ('id', models.AutoField(primary_key=True, auto_created=True, verbose_name='ID', serialize=False)),
                ('user_agent', models.CharField(max_length=200)),
                ('screen_size', models.CharField(null=True, max_length=12)),
                ('browser_url', models.CharField(null=True, max_length=200)),
                ('languages', models.CharField(null=True, max_length=50)),
                ('client_ip', models.CharField(null=True, max_length=15)),
                ('client_ip_other', models.CharField(null=True, max_length=15)),
                ('server_ip', models.CharField(default=research.utils.get_host_ip, max_length=15)),
                ('is_sent', models.NullBooleanField()),
                ('creation_time', models.DateTimeField(default=django.utils.timezone.now)),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(primary_key=True, auto_created=True, verbose_name='ID', serialize=False)),
                ('user_type', models.CharField(null=True, max_length=15)),
                ('user_count', models.CharField(null=True, max_length=2)),
                ('creation_time', models.DateTimeField(default=django.utils.timezone.now)),
            ],
        ),
        migrations.CreateModel(
            name='UUID',
            fields=[
                ('session_id', models.CharField(primary_key=True, serialize=False, max_length=36)),
                ('creation_time', models.DateTimeField(default=django.utils.timezone.now)),
                ('configuration', models.ForeignKey(related_name='configurations', to='research.Configuration', default=research.models.get_configuration)),
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
