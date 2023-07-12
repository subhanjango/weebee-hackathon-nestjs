import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor( @InjectRepository(User)
    private userRepository: Repository<User>){}

    async createUser(email : string , firstName : string , lastName : string) : Promise<User> {
        let userAvailable = await this.userRepository.findOneBy({email});
        if(userAvailable) {
            return userAvailable;
        }
        return await this.userRepository.save(this.userRepository.create({
            email,
            firstName,
            lastName
        }));
    }
}
