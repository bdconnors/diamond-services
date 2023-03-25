import { ClientProviderOptions, ClientsModuleOptions, Transport } from "@nestjs/microservices";

const ClientNames: string[] = ['ORG', 'SITE', 'USER', 'AUTH'];

export const makeClientProviderOption = (name: string): ClientProviderOptions => ({ 
  name: `${name}_SERVICE`, 
  transport: Transport.RMQ,
  options: {
    urls: [process.env.RABBITMPQ_URL],
    queue: `${name}_QUEUE`,
    queueOptions: {
      durable: false
    }
  }
});

export const getClientOptions = (): ClientsModuleOptions => {
  return ClientNames.map((name: string)=>makeClientProviderOption(name));
};