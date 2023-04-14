import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy, EventPattern, MessagePattern } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { AuthUserDto } from './dto/auth-user.dto';

@Controller('auth')
export class AuthController {
    constructor(@Inject('REGISTER_SERVICE') private client: ClientProxy,
                private authService: AuthService) {

    }
    //Получаем ответ от profile
    @EventPattern('profile')
    showAttr(data) {
        const profile = data;

        console.log(profile);
    }

    @Post('/login')
    login(@Body() dto: AuthUserDto) {
        const login = this.authService.login(dto);
        console.log(login);
        this.client.emit('login', dto);
        return login;
    }

    @Post('/create')
    async create(@Body() dto: AuthUserDto) {
        //Отправляем поля firstname, secondname, phone в profile
        await this.client.emit('create', dto);
        return this.authService.createUser(dto);
    }
    
    @Get()
    getAll() {
        return this.authService.getAllUsers();
    }
}
