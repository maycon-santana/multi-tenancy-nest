import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRoles } from './user-roles';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(private prismaService: PrismaService) {}

    create(data: CreateUserDto) {
        return this.prismaService.user.create({
            data: {
                ...data,
                password: this.generateHash(data.password),
                roles: [UserRoles.ADMIN],
            },
        });
    }

    generateHash(password: string) {
        return bcrypt.hashSync(password, 10);
    }
}
