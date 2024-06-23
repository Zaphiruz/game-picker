import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from './dtos/auth.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private usersService: UsersService,
    ) { }

    generateJwt(payload) {
        return this.jwtService.sign(payload);
    }

    async signIn(user) {
        if (!user) {
            throw new BadRequestException('Unauthenticated');
        }

        const userExists = await await this.usersService.findOne({ email: user.email });

        if (!userExists) {
            return this.registerUser(user);
        }

        return this.generateJwt({
            sub: userExists.id,
            email: userExists.email,
        });
    }

    async registerUser(user: RegisterUserDto) {
        try {
            const newUser = await this.usersService.create(user);

            return this.generateJwt({
                sub: newUser.id,
                email: newUser.email,
            });
        } catch {
            throw new InternalServerErrorException();
        }
    }
}