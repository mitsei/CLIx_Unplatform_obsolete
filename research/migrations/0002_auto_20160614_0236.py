# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import research.models


class Migration(migrations.Migration):

    dependencies = [
        ('research', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='configuration',
            name='district',
            field=models.CharField(null=True, max_length=32),
        ),
        migrations.AddField(
            model_name='configuration',
            name='state',
            field=models.CharField(null=True, max_length=32),
        ),
        migrations.AddField(
            model_name='uuid',
            name='configuration',
            field=models.ForeignKey(related_name='configurations', to='research.Configuration', default=research.models.get_configuration),
        ),
    ]
