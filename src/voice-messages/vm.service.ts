import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateVMDto } from './dto/create-vm.dto';
import { VoiceMessage, VoiceMessageDocument } from './vm.document';

@Injectable()
export class VoiceMessagesService {
  private logger: Logger = new Logger(VoiceMessagesService.name);

  constructor(
    @InjectModel(VoiceMessage.name)
    private voiceMessageModel: Model<VoiceMessageDocument>,
  ) {}

  async getAll(): Promise<VoiceMessage[] | string> {
    this.logger.log(`Voice message // get all`);
    return 'All voice messages';
  }
  async getOne(): Promise<VoiceMessage | string> {
    this.logger.log(`Voice message // get one`);
    return '';
  }
  async create(vmDto: CreateVMDto): Promise<VoiceMessage> {
    this.logger.log(`Voice message // create`);
    const vm = await this.voiceMessageModel.create(vmDto);
    return vm;
  }
  async delete(): Promise<boolean> {
    this.logger.log(`Voice message // delete`);
    return true;
  }
}
