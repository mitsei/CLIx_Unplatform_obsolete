# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('research', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='uuid',
            name='uuid',
            field=models.CharField(max_length=36, serialize=False, primary_key=True),
        ),
    ]
