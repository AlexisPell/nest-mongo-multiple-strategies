import { Logger } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WsResponse,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway()
export class WSAppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() wss: Server;

  private logger: Logger = new Logger(WSAppGateway.name);

  afterInit(server: Server) {
    this.logger.log('WS App initialized');
  }
  handleConnection(socketClient: Socket, ...args: any[]) {
    this.logger.log(`Client connected to WS: ${socketClient.id}`);
  }
  handleDisconnect(socketClient: Socket) {
    this.logger.log(`Client disconnected from WS: ${socketClient.id}`);
  }

  @SubscribeMessage('msgToServer')
  handleMessage(socketClient: Socket, payload: string): WsResponse<string> {
    // this.wss.emit('msgToClient', text)             // - send to everyone
    // socketClient.emit('msgToClient', 'Hello world!');    // - send to receiver
    return { event: 'msgToClient', data: payload }; // - send to receiver
  }
}
