# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('research', '0002_auto_20160613_2037'),
    ]

    operations = [
        migrations.AddField(
            model_name='configuration',
            name='district',
            field=models.CharField(default='NOTSET', max_length=32),
        ),
        migrations.AddField(
            model_name='configuration',
            name='state',
            field=models.CharField(default='NOTSET', max_length=32),
        ),
    ]
