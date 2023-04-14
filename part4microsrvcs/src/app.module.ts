import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from './auth/user.model';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthService } from './auth/auth.service';



@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
  }),
  SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',//process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: 'qwestern13!',//process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User],
      autoLoadModels: true
    }),
    AuthModule
  ]
})
export class AppModule {}
