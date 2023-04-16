import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
//import { AuthController } from './auth.controller';
import { User } from './user.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [AuthService],
  //controllers: [AuthController],
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',//process.env.POSTGRES_HOST,
      port: 5432, //Number(process.env.POSTGRES_PORT),
      username: 'postgres',//process.env.POSTGRES_USER,
      password: 'qwestern13!',//process.env.POSTGRES_PASSWORD,
      database: 'authusers',//process.env.POSTGRES_DB,
      models: [User],
      autoLoadModels: true
    }),
      SequelizeModule.forFeature([User]),
     // JwtModule.register({
     //   secret: 'SECRET',
     //   signOptions: {
     //     expiresIn: '24h'
     //   }})  
  ],
  //exports: [AuthService]
})

export class AuthModule {}
