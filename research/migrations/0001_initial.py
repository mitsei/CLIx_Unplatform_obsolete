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
                ('id', models.AutoField(verbose_name='ID', serialize=False, primary_key=True, auto_created=True)),
                ('app_name', models.CharField(max_length=32)),
                ('event_type', models.CharField(max_length=32)),
                ('params', models.TextField()),
                ('is_sent', models.NullBooleanField()),
                ('creation_time', models.DateTimeField(default=django.utils.timezone.now)),
            ],
        ),
        migrations.CreateModel(
            name='Fingerprint',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, primary_key=True, auto_created=True)),
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
                ('id', models.AutoField(verbose_name='ID', serialize=False, primary_key=True, auto_created=True)),
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
            ],
        ),
        migrations.AddField(
            model_name='user',
            name='session_id',
            field=models.ForeignKey(to='research.UUID', related_name='users'),
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
