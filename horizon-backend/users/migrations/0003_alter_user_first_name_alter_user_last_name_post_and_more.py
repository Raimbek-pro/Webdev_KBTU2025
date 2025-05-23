# Generated by Django 5.2 on 2025-04-09 15:11

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_remove_user_name_remove_user_surname'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='first_name',
            field=models.CharField(max_length=150),
        ),
        migrations.AlterField(
            model_name='user',
            name='last_name',
            field=models.CharField(max_length=150),
        ),
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.TextField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('user_id', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='posts', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.TextField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('user_id', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='comments', to=settings.AUTH_USER_MODEL)),
                ('post_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comments', to='users.post')),
            ],
        ),
        migrations.CreateModel(
            name='Like',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='likes', to=settings.AUTH_USER_MODEL)),
                ('post_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='likes', to='users.post')),
            ],
            options={
                'unique_together': {('post_id', 'user_id')},
            },
        ),
        migrations.CreateModel(
            name='Subscription',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('followed_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='followers', to=settings.AUTH_USER_MODEL)),
                ('follower_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='followed', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'unique_together': {('follower_id', 'followed_id')},
            },
        ),
    ]
