# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('research', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='fingerprint',
            name='client_ip',
            field=models.CharField(max_length=15, null=True),
        ),
        migrations.AlterField(
            model_name='fingerprint',
            name='server_ip',
            field=models.CharField(max_length=15, null=True),
        ),
        migrations.AlterField(
            model_name='fingerprint',
            name='user_agent',
            field=models.CharField(max_length=200),
        ),
        migrations.AlterField(
            model_name='fingerprint',
            name='uuid',
            field=models.CharField(max_length=32, null=True),
        ),
    ]
