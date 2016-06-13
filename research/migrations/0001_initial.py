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
                ('id', models.AutoField(serialize=False, auto_created=True, primary_key=True, verbose_name='ID')),
                ('app_name', models.CharField(max_length=32)),
                ('event_type', models.CharField(max_length=32)),
                ('params', models.TextField()),
                ('creation_time', models.DateTimeField(default=django.utils.timezone.now)),
            ],
        ),
        migrations.CreateModel(
            name='Fingerprint',
            fields=[
                ('id', models.AutoField(serialize=False, auto_created=True, primary_key=True, verbose_name='ID')),
                ('user_agent', models.CharField(max_length=200)),
                ('screen_size', models.CharField(null=True, max_length=12)),
                ('browser_url', models.CharField(null=True, max_length=200)),
                ('languages', models.CharField(null=True, max_length=50)),
                ('client_ip', models.CharField(null=True, max_length=15)),
                ('client_ip_other', models.CharField(null=True, max_length=15)),
                ('server_ip', models.CharField(null=True, max_length=15)),
                ('creation_time', models.DateTimeField(default=django.utils.timezone.now)),
            ],
        ),
        migrations.CreateModel(
            name='UUID',
            fields=[
                ('session_id', models.CharField(max_length=36, serialize=False, primary_key=True)),
                ('creation_time', models.DateTimeField(default=django.utils.timezone.now)),
            ],
        ),
        migrations.AddField(
            model_name='fingerprint',
            name='session_id',
            field=models.ForeignKey(to='research.UUID', related_name='fingerprints'),
        ),
        migrations.AddField(
            model_name='appdata',
            name='session_id',
            field=models.ForeignKey(to='research.UUID', related_name='appdata'),
        ),
    ]
