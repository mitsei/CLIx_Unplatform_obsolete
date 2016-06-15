# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import django.utils.timezone
import research.models


class Migration(migrations.Migration):

    dependencies = [
        ('research', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appdata',
            name='event_type',
            field=models.CharField(max_length=32),
        ),
        migrations.AlterField(
            model_name='uuid',
            name='configuration',
            field=models.ForeignKey(related_name='configurations', default=research.models.get_configuration, to='research.Configuration'),
        ),
        migrations.AddField(
            model_name='user',
            name='session_id',
            field=models.ForeignKey(to='research.UUID', related_name='users'),
        ),
    ]
