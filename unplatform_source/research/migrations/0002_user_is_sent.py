# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('research', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='is_sent',
            field=models.NullBooleanField(),
        ),
    ]
