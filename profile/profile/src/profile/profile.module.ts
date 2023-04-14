import { Module} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Profile } from './profile.model';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { HttpModule } from '@nestjs/axios';

@Module({
  providers: [ProfileService],
  controllers: [ProfileController],
  imports: [
    SequelizeModule.forFeature([Profile]),
    ClientsModule.register([
      {
        name: 'LOGIN_SERVICE',
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
    HttpModule
  ],
  exports: [ProfileService]
})
export class ProfileModule {}
