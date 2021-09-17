import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VoiceMessage, VoiceMessageSchema } from './vm.document';
import { VoiceMessageController } from './vm.controller';
import { VoiceMessagesService } from './vm.service';

@Module({
  controllers: [VoiceMessageController],
  providers: [VoiceMessagesService],
  imports: [
    MongooseModule.forFeature([
      { name: VoiceMessage.name, schema: VoiceMessageSchema },
    ]),
  ],
})
export class VoiceMessageModule {}
