import { ClientsModuleOptions, Transport } from "@nestjs/microservices";

export const clients: ClientsModuleOptions = [
  { 
    name: `LOGGER_SERVICE`, 
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL],
      queue: `LOGGER_QUEUE`,
      queueOptions: {
        durable: false
      }
    }
  }
];