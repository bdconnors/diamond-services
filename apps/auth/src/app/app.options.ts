import { ClientsModuleOptions, Transport } from "@nestjs/microservices";

export const clients: ClientsModuleOptions = [
  { 
    name: `USER_SERVICE`, 
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL],
      queue: `USER_QUEUE`,
      queueOptions: {
        durable: false
      }
    }
  }
];