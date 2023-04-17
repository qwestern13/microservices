import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from './user.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
    SequelizeModule.forFeature([User]),
    JwtModule.register({
      secret: 'SECRET',
      signOptions: {
        expiresIn: '24h'
      }}),
      ClientsModule.register([
        {
          name: 'REGISTER_SERVICE',
          transport: Transport.RMQ,
          options: {
            urls: ['amqp://guest:guest@127.0.0.1:5672'],
            queue: 'main_queue',
            queueOptions: {
              durable: false
            },
          },
        },
      ]),  
  ],
  exports: [AuthService]
})
export class AuthModule {}
