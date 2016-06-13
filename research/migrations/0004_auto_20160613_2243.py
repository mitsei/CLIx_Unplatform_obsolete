# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import research.models


class Migration(migrations.Migration):

    dependencies = [
        ('research', '0003_auto_20160613_2239'),
    ]

    operations = [
        migrations.AlterField(
            model_name='uuid',
            name='configuration',
            field=models.ForeignKey(default=research.models.get_configuration, related_name='configuration', to='research.Configuration'),
        ),
    ]
