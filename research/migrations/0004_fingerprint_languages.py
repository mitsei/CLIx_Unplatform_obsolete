# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('research', '0003_auto_20160401_1631'),
    ]

    operations = [
        migrations.AddField(
            model_name='fingerprint',
            name='languages',
            field=models.CharField(null=True, max_length=50),
        ),
    ]
