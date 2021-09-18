import path from 'path';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { ServeStaticModule } from '@nestjs/serve-static';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { WSAppGateway } from './wsapp.gateway';
import { VoiceMessageModule } from './voice-messages/vm.module';
import { FilesModule } from './files/files.module';
import { srcPath } from './common/constants/paths';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `.${process.env.NODE_ENV}.env` }),
    ServeStaticModule.forRoot({
      rootPath: path.join(srcPath, 'static'),
    }),
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
    FilesModule,
    VoiceMessageModule,
  ],
  providers: [WSAppGateway],
})
export class AppModule {}
