# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Fingerprint',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('uuid', models.CharField(max_length=36, null=True)),
                ('user_agent', models.CharField(max_length=200)),
                ('screen_size', models.CharField(max_length=12, null=True)),
                ('browser_url', models.CharField(max_length=200, null=True)),
                ('languages', models.CharField(max_length=50, null=True)),
                ('client_ip', models.CharField(max_length=15, null=True)),
                ('client_ip_other', models.CharField(max_length=15, null=True)),
                ('server_ip', models.CharField(max_length=15, null=True)),
                ('creation_time', models.DateTimeField(default=django.utils.timezone.now)),
            ],
        ),
    ]

