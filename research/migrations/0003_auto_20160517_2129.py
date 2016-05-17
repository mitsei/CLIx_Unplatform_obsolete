# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('research', '0002_auto_20160517_2122'),
    ]

    operations = [
        migrations.RenameField(
            model_name='uuid',
            old_name='uuid',
            new_name='session_id',
        ),
    ]
