# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('research', '0002_auto_20160614_0236'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(primary_key=True, auto_created=True, verbose_name='ID', serialize=False)),
                ('user_type', models.CharField(max_length=15, null=True)),
                ('user_count', models.CharField(max_length=2, null=True)),
                ('creation_time', models.DateTimeField(default=django.utils.timezone.now)),
                ('session_id', models.ForeignKey(to='research.UUID', related_name='users')),
            ],
        ),
    ]
