import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Profile } from './profile/profile.model';
import { ProfileModule } from './profile/profile.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'//`.${process.env.NODE_ENV}.env`
    }),
    SequelizeModule.forRoot({
    dialect: 'postgres',
    host: 'localhost',//process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    models: [Profile],
    autoLoadModels: true
    }),
    ProfileModule
],
})
export class AppModule {}
