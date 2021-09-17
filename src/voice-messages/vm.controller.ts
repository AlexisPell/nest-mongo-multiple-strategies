import {
  Body,
  Get,
  Post,
  Req,
  BadRequestException,
  Controller,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';
import { CreateVMDto } from './dto/create-vm.dto';
import { VoiceMessagesService } from './vm.service';

@ApiTags('Voice Messages')
@Controller('voice-messages')
export class VoiceMessageController {
  constructor(private voiceMessagesService: VoiceMessagesService) {}

  @ApiOperation({ summary: 'Get all voice messages' })
  @ApiOkResponse({ type: '', description: 'All voice messages' })
  @Get()
  getAll() {
    return this.voiceMessagesService.getAll();
  }

  @ApiOperation({ summary: 'Get one voice message' })
  @ApiOkResponse({ type: '', description: 'voice message' })
  @Get('asd')
  getOne() {
    return;
  }

  @ApiOperation({ summary: 'Create new voice message' })
  @ApiCreatedResponse({ type: '', description: 'voice message' })
  @Post()
  create(@Body() dto: CreateVMDto) {
    return this.voiceMessagesService.create(dto);
  }

  @ApiOperation({ summary: 'Delete voice record' })
  @ApiOkResponse({ type: '', description: 'voice record deleted' })
  @Delete()
  delete() {
    return;
  }
}
