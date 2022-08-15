import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskInput } from 'src/task/dto/create-task.input';
import { Task } from 'src/task/task.entity';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './user.entity';

@Injectable()
export class UserService {
    
    constructor(@InjectRepository(User) private userRepo: Repository<User>){}

    async findOneByUsername(username: string): Promise<User>{
        return this.userRepo.findOne({username})
    }

    async findAll(): Promise<User[]> {
        return this.userRepo.find();
    }

    async create(createUserInput: CreateUserInput): Promise<User> {
        const newUser = this.userRepo.create(createUserInput);
        return this.userRepo.save(newUser);
    }

    async findOne(id: number): Promise<User>{
        return this.userRepo.findOneOrFail(id);
    }

    async remove(id: number){
        const deletedUser = await this.userRepo.findOne(id);
        if(deletedUser == null){
            return false;
        }
        this.userRepo.delete(id);
            return true;
        }
    //

}
