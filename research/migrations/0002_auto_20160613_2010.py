# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('research', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Configuration',
            fields=[
                ('school_id', models.CharField(serialize=False, primary_key=True, max_length=36)),
                ('terminal_id', models.CharField(null=True, max_length=6)),
                ('creation_time', models.DateTimeField(default=django.utils.timezone.now)),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, serialize=False, verbose_name='ID', primary_key=True)),
                ('user_type', models.CharField(null=True, max_length=15)),
                ('user_count', models.CharField(null=True, max_length=2)),
                ('creation_time', models.DateTimeField(default=django.utils.timezone.now)),
                ('session_id', models.ForeignKey(to='research.UUID', related_name='users')),
            ],
        ),
        migrations.AddField(
            model_name='appdata',
            name='is_sent',
            field=models.NullBooleanField(),
        ),
        migrations.AddField(
            model_name='fingerprint',
            name='is_sent',
            field=models.NullBooleanField(),
        ),
        migrations.AddField(
            model_name='uuid',
            name='configuration',
            field=models.ForeignKey(to='research.Configuration', related_name='configuration', default='NOTSET'),
        ),
    ]
