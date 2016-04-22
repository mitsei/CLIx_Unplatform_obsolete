# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('research', '0004_fingerprint_languages'),
    ]

    operations = [
        migrations.AddField(
            model_name='fingerprint',
            name='is_sent',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='fingerprint',
            name='creation_time',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]
