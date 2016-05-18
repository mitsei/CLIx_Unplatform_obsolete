# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('research', '0003_auto_20160517_2129'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appdata',
            name='session_id',
            field=models.ForeignKey(to='research.UUID'),
        ),
    ]
