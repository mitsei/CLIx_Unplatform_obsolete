# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Fingerprint',
            fields=[
                ('id', models.AutoField(primary_key=True, auto_created=True, serialize=False, verbose_name='ID')),
                ('uuid', models.CharField(max_length=32, null=True)),
                ('user_agent', models.CharField(max_length=200)),
                ('client_ip', models.CharField(max_length=15, null=True)),
                ('client_ip_other', models.CharField(max_length=15, null=True)),
                ('server_ip', models.CharField(max_length=15, null=True)),
                ('creation_time', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
