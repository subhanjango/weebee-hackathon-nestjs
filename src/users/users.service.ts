import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor( @InjectRepository(User)
    private userRepository: Repository<User>){}

    async createUser(user : CreateUserDto) : Promise<User> {
        let userAvailable = await this.userRepository.findOneBy({email : user.emailAddress});
        if(userAvailable) {
            return userAvailable;
        }
        return await this.userRepository.save(this.userRepository.create({
            email : user.emailAddress,
            firstName : user.firstName,
            lastName : user.lastName
        }));
    }
}
