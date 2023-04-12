import { ClientsModuleOptions, Transport } from "@nestjs/microservices";

export const clients: ClientsModuleOptions = [
  { 
    name: `ORG_SERVICE`, 
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL],
      queue: `ORG_QUEUE`,
      queueOptions: {
        durable: false
      }
    }
  },
  { 
    name: `SITE_SERVICE`, 
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMPQ_URL],
      queue: `SITE_QUEUE`,
      queueOptions: {
        durable: false
      }
    }
  },
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