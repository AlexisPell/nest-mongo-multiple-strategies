import {
  Body,
  Get,
  Post,
  Req,
  Controller,
  Delete,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { Request } from 'express';
import { CreateVMDto } from './dto/create-vm.dto';
import { VoiceMessage } from './vm.document';
import { VoiceMessagesService } from './vm.service';

@ApiTags('Voice Messages')
@Controller('voice-messages')
export class VoiceMessageController {
  constructor(private voiceMessagesService: VoiceMessagesService) {}

  @ApiOperation({ summary: 'Get all voice messages' })
  @ApiOkResponse({ type: [VoiceMessage], description: 'All voice messages' })
  @Get()
  getAll() {
    return this.voiceMessagesService.getAll();
  }

  @ApiOperation({ summary: 'Get one voice message' })
  @ApiOkResponse({ type: VoiceMessage, description: 'voice message' })
  @Get(':id')
  getOne(@Req() req: Request) {
    return this.voiceMessagesService.getOne(req.params.id);
  }

  @ApiOperation({ summary: 'Create new voice message' })
  @ApiCreatedResponse({ type: VoiceMessage, description: 'voice message' })
  @UseInterceptors(FileInterceptor('audio'))
  @Post()
  createVM(@Req() req: any, @UploadedFile() audio: Express.Multer.File) {
    return this.voiceMessagesService.create(req.user._id, audio);
  }

  @ApiOperation({ summary: 'Delete voice record' })
  @ApiOkResponse({ type: Boolean, description: 'voice record deleted' })
  @Delete(':id')
  delete(@Req() req: Request) {
    return this.voiceMessagesService.delete(req.params.id);
  }
}
