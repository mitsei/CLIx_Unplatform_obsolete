# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import research.models


class Migration(migrations.Migration):

    dependencies = [
        ('research', '0004_auto_20160613_2243'),
    ]

    operations = [
        migrations.AlterField(
            model_name='configuration',
            name='district',
            field=models.CharField(max_length=32, null=True),
        ),
        migrations.AlterField(
            model_name='configuration',
            name='state',
            field=models.CharField(max_length=32, null=True),
        ),
        migrations.AlterField(
            model_name='uuid',
            name='configuration',
            field=models.ForeignKey(related_name='configurations', to='research.Configuration', default=research.models.get_configuration),
        ),
    ]
