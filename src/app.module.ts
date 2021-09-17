import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { WSAppGateway } from './wsapp.gateway';
import { VoiceMessageModule } from './voice-messages/vm.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `.${process.env.NODE_ENV}.env` }),
    // MongooseModule.forRoot(process.env.MONGO_URI as string),
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: process.env.MONGO_URI as string,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      }),
    }),
    PassportModule.register({ session: true }),
    UsersModule,
    AuthModule,
    VoiceMessageModule,
  ],
  providers: [WSAppGateway],
})
export class AppModule {}
