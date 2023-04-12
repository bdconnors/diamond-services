import { Injectable, Inject } from '@nestjs/common';
import { ClientRMQ } from '@nestjs/microservices';

export type LogLevel = 'info' | 'warn' | 'debug' | 'error';

@Injectable()
export class LoggerClient {

  constructor(@Inject('LOGGER_SERVICE') private client: ClientRMQ){}

  info(method: string, action: string, description: string, data: any) {
    this.send('info', method, action, description, data);
  }
  
  debug(method: string, action: string, description: string, data: any) {
    this.send('debug', method, action, description, data);
  }

  warn(method: string, action: string, description: string, data: any) {
    this.send('warn', method, action, description, data);
  }
  
  error(method: string, action: string, description: string, data: any) {
    this.send('error', method, action, description, data);
  }

  private send(level: LogLevel, method: string, action: string, description: string, data: any) {
    this.client.emit(level, 
      { 
        method: method, 
        action: action, 
        description: description, 
        data: data 
      }
    );
  }
}