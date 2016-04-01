# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('research', '0002_auto_20160401_1542'),
    ]

    operations = [
        migrations.AlterField(
            model_name='fingerprint',
            name='uuid',
            field=models.CharField(max_length=36, null=True),
        ),
    ]
