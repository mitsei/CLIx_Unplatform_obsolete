# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('research', '0006_auto_20160607_2020'),
    ]

    operations = [
        migrations.CreateModel(
            name='Configuration',
            fields=[
                ('school_id', models.CharField(primary_key=True, serialize=False, max_length=36)),
                ('terminal_id', models.CharField(null=True, max_length=6)),
                ('creation_time', models.DateTimeField(default=django.utils.timezone.now)),
            ],
        ),
        migrations.AddField(
            model_name='uuid',
            name='configuration',
            field=models.ForeignKey(related_name='configuration', to='research.Configuration', default='NOTSET'),
        ),
    ]
