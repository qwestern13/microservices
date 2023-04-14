import { HttpService } from '@nestjs/axios';
import { Body, Controller, Get, Inject, Param, Post} from '@nestjs/common';
import { ClientProxy, EventPattern, MessagePattern } from '@nestjs/microservices';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Profile } from './profile.model';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {

    constructor(
        @Inject('LOGIN_SERVICE') private client: ClientProxy,
        private profileService: ProfileService,
        private httpService: HttpService) {

    }
    
    @EventPattern('create')
    async createProfile(data) {
       // const firstname = data.firstname;
        console.log(data);
        return await this.profileService.createProfile(data);
        
    }

    @EventPattern('login')
    async login(data) {
        const email = data.email;
        const result = await this.profileService.getProfile(data);
        console.log(result);
    }

    @Post('/create')
    create(@Body() dto: CreateProfileDto) {
        return this.profileService.createProfile(dto);
    }
}


