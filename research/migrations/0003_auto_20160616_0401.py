# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import django.utils.timezone
import research.models
import research.utils


class Migration(migrations.Migration):

    dependencies = [
        ('research', '0002_auto_20160615_2127'),
    ]

    operations = [
        migrations.AddField(
            model_name='configuration',
            name='is_sent',
            field=models.NullBooleanField(),
        ),
        migrations.AlterField(
            model_name='fingerprint',
            name='server_ip',
            field=models.CharField(default=research.utils.get_host_ip, max_length=15),
        ),
        migrations.AlterField(
            model_name='uuid',
            name='configuration',
            field=models.ForeignKey(related_name='configurations', default=research.models.get_configuration, to='research.Configuration'),
        ),
    ]
