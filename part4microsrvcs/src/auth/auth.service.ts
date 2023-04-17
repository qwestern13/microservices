import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { AuthUserDto } from './dto/auth-user.dto';
import { User } from './user.model';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {

    constructor(@InjectModel (User) private userRepository: typeof User, 
        private jwtService: JwtService,) {

    }

    async login(dto: AuthUserDto) {
        const user = await this.validateUser(dto);
        const login = await this.generateToken(user);
        return login;
    }

    async generateToken(user: User) {
        console.log(user);
        const payload = {id: user.id, email: user.email};
        return {
            token: this.jwtService.sign(payload)
        }
    }

    async validateUser(dto: AuthUserDto) {
        const email = dto.email;
        const user = await this.userRepository.findOne({where: {email}, include: {all: true}});
        const passwordEquals = await bcrypt.compare(dto.password, user.password);
        if (user && passwordEquals) {
            return user;
        }
        throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND)
        
    }

    async createUser(dto: AuthUserDto) {
        const hashPassword = await bcrypt.hash(dto.password, 5);
        const email = dto.email
        const candidate = await this.userRepository.findOne({where: {email}});
        if (candidate) {
            throw new HttpException(`Пользователь с email = ${email} существует`, HttpStatus.BAD_REQUEST);
        } 
        const user = await this.userRepository.create({email: dto.email, password: hashPassword});
        return user;
    }

    async getAllUsers() {
        return this.userRepository.findAll({include: {all: true}});
    }

    async getUser(id: number) {
        return await this.userRepository.findOne({where: {id}})
    }
}
