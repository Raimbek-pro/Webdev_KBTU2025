# Generated by Django 5.2 on 2025-04-09 16:02

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0004_rename_post_id_comment_post_and_more'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='like',
            unique_together=None,
        ),
        migrations.RemoveField(
            model_name='like',
            name='post',
        ),
        migrations.RemoveField(
            model_name='like',
            name='user',
        ),
        migrations.RemoveField(
            model_name='post',
            name='user',
        ),
        migrations.AlterUniqueTogether(
            name='subscription',
            unique_together=None,
        ),
        migrations.RemoveField(
            model_name='subscription',
            name='followed',
        ),
        migrations.RemoveField(
            model_name='subscription',
            name='follower',
        ),
        migrations.DeleteModel(
            name='Comment',
        ),
        migrations.DeleteModel(
            name='Like',
        ),
        migrations.DeleteModel(
            name='Post',
        ),
        migrations.DeleteModel(
            name='Subscription',
        ),
    ]
