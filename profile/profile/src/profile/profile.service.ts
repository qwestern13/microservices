import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/sequelize';
import { Profile } from './profile.model';

@Injectable()
export class ProfileService {

    constructor(@InjectModel(Profile) private profileRepository: typeof Profile,
                @Inject('LOGIN_SERVICE') private client: ClientProxy,) {

    }

    async createProfile(data) {
        const email = data.email
        const candidate = await this.profileRepository.findOne({where: {email}});
        if (candidate) {
            throw new HttpException('Пользователь с таким номером телефона зарегистрирован', HttpStatus.BAD_REQUEST);
        }
        const profile = await this.profileRepository.create(data);
        return profile;
    }

    async getProfile(data) {
        const email = data.email;
        const profile = await this.profileRepository.findOne({where: {email}});
        if (!profile) {
            throw new HttpException('Profile not found', HttpStatus.NOT_FOUND);
        }
        console.log(profile);
        await this.client.emit('profile', profile);
        return profile;
    }

    async getAllProfiles() {
        return await this.profileRepository.findAll({include: {all: true}});
    }

}
