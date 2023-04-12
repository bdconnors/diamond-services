import { Injectable, LoggerService, LogLevel } from '@nestjs/common';
import winston from 'winston'
import { SeqTransport } from '@datalust/winston-seq';
import { LogEventDto } from './dto/log-event.dto';

@Injectable()
export class AppService implements LoggerService {

  logger: winston.Logger;

  constructor(){
    this.logger = winston.createLogger({
      level: process.env.SEQ_LOG_LEVEL,
      format: winston.format.combine(
        winston.format.errors({ stack: true }),
        winston.format.json(),
      ),
      transports: [
        new winston.transports.Console({
            format: winston.format.simple(),
        }),
        new SeqTransport({
          serverUrl: process.env.SEQ_URL,
          apiKey: process.env.SEQ_API_KEY,
          onError: (e => { console.error(e) }),
          handleExceptions: true,
          handleRejections: true,
        })
      ]
    })
  }

  log(message: LogEventDto) {
    this.logger.info("{method} - {description}", message);
  }
  error(message: LogEventDto) {
    this.logger.error("{method} - {description}", message);
  }
  warn(message: LogEventDto) {
    this.logger.warn("{method} - {description}",message);
  }
  debug?(message: LogEventDto) {
    this.logger.debug("{method} - {description}", message);
  }
  verbose?(message: LogEventDto) {
    this.logger.verbose("{method} - {description}", message);
  }
  setLogLevels?(levels: LogLevel[]) {
    throw new Error('Method not implemented.');
  }
}
