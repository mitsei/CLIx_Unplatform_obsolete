# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('research', '0005_auto_20160526_2023'),
    ]

    operations = [
        migrations.AddField(
            model_name='uuid',
            name='user_count',
            field=models.CharField(null=True, max_length=2),
        ),
        migrations.AddField(
            model_name='uuid',
            name='user_type',
            field=models.CharField(null=True, max_length=15),
        ),
        migrations.AlterField(
            model_name='appdata',
            name='app_name',
            field=models.CharField(max_length=32),
        ),
        migrations.AlterField(
            model_name='appdata',
            name='event_type',
            field=models.CharField(max_length=32),
        ),
    ]
