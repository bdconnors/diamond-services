import { ClientProviderOptions, ClientsModuleOptions, Transport } from "@nestjs/microservices";

const ClientNames: string[] = ['ORG', 'SITE', 'USER'];

export const makeClientProviderOption = (name: string): ClientProviderOptions => ({ 
  name: `${name}_SERVICE`, 
  transport: Transport.RMQ,
  options: {
    urls: [process.env.RABBITMQ_URL],
    queue: `${name}_QUEUE`,
    queueOptions: {
      durable: false
    }
  }
});

export const getClientOptions = (): ClientsModuleOptions => {
  return ClientNames.map((name: string)=>makeClientProviderOption(name));
};