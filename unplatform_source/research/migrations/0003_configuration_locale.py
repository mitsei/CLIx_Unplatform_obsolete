# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('research', '0002_user_is_sent'),
    ]

    operations = [
        migrations.AddField(
            model_name='configuration',
            name='locale',
            field=models.CharField(default=b'en', max_length=2),
        ),
    ]
