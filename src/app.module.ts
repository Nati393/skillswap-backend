import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/user.module';
import { SkillsModule } from './skills/skill.module';
import { ExchangesModule } from './exchanges/exchange.module';
import { ReviewsModule } from './reviews/review.module';
import { PostsModule } from './posts/post.module';
import { AuthModule } from './auth/auth.module';  

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB_URI!),
    UsersModule,
    SkillsModule,
    ExchangesModule,
    ReviewsModule,
    PostsModule,
    AuthModule,  
  ],
})
export class AppModule {}