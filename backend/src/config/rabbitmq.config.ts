import { ClientProxyFactory, Transport } from '@nestjs/microservices';

export const rabbitMQClient = ClientProxyFactory.create({
  transport: Transport.RMQ,
  options: {
    urls: ['amqp://localhost:5672'],
    queue: 'auditoria_queue',
    queueOptions: {
      durable: true,
    },
  },
});
