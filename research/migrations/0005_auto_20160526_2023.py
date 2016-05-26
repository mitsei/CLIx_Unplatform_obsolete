# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('research', '0004_auto_20160526_0022'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appdata',
            name='creation_time',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
        migrations.AlterField(
            model_name='appdata',
            name='session_id',
            field=models.ForeignKey(to='research.UUID', related_name='appdata'),
        ),
        migrations.AlterField(
            model_name='fingerprint',
            name='session_id',
            field=models.ForeignKey(to='research.UUID', related_name='fingerprints'),
        ),
    ]
