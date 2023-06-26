import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config/dist';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { MailerModule } from './mailer/mailer.module';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [ConfigModule.forRoot({isGlobal : true}), AuthModule, PrismaModule, MailerModule, PostModule, CommentModule],
})
export class AppModule {}
