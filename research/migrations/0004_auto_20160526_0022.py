# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('research', '0003_auto_20160525_2143'),
    ]

    operations = [
        migrations.AlterField(
            model_name='uuid',
            name='creation_time',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]
