import { Injectable, LoggerService, LogLevel } from '@nestjs/common';
import winston from 'winston'
import { SeqTransport } from '@datalust/winston-seq';

@Injectable()
export class AppService implements LoggerService {

  logger: winston.Logger;

  constructor(){
    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.errors({ stack: true }),
        winston.format.json(),
      ),
      transports: [
        new winston.transports.Console({
            format: winston.format.simple(),
        }),
        new SeqTransport({
          serverUrl: "http://localhost:5341",
          apiKey: "APvyFiJEoourwUKH89un",
          onError: (e => { console.error(e) }),
          handleExceptions: true,
          handleRejections: true,
        })
      ]
    })
  }
  log(message: any, ...optionalParams: any[]) {
    this.logger.info("{method} - {description}", message);
  }
  error(message: any, ...optionalParams: any[]) {
    this.logger.error("{method} - {description}", message);
  }
  warn(message: any, ...optionalParams: any[]) {
    this.logger.warn("{method} - {description}",message);
  }
  debug?(message: any, ...optionalParams: any[]) {
    this.logger.debug("{method} - {description}", message);
  }
  verbose?(message: any, ...optionalParams: any[]) {
    this.logger.verbose("{method} - {description}", message);
  }
  setLogLevels?(levels: LogLevel[]) {
    throw new Error('Method not implemented.');
  }
}
