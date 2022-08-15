import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { TaskRepository } from './task.repo';
import { User } from 'src/user/user.entity';

@Injectable()
export class TaskService {
    constructor(
        private taskRepo: TaskRepository,
        @InjectRepository(User) private userRepo: Repository<User>
        ) {};

    async findAll(): Promise<Task[]> {
        return this.taskRepo.find();
    }

    async findOne(id: number): Promise<Task>{
        return this.taskRepo.findOneOrFail(id);
    }

    async getUser(userId:number): Promise<User> {
        return this.userRepo.findOne(userId);
    }

    async findTasks(done: boolean): Promise<Task[]> {
        return this.taskRepo.find({ done });
    }
    
    async update(id: number, input: UpdateTaskInput): Promise<Task> {
        const task = await this.taskRepo.findOne(id);
        console.log(task)
        if(task === null){
            return null;
        }

        if(task.name !== null) {
            task.name = input.name;
        }
        task.done = input.done; 
        task.description = input.description;
        task.updatedAt = new Date();
        task.start = input.start;
        task.end = input.end;
        return this.taskRepo.save(task);
    }

    async remove(id: number){
        const deletedTask = await this.taskRepo.findOne(id);
        if(deletedTask == null){
            return false;
        }
        this.taskRepo.delete(id);
        return true;
        }

    async setDone(id: number, done: boolean): Promise<Task> {
        const task = await this.taskRepo.findOne(id);
        task.done = done; 
        task.updatedAt = new Date();
        return this.taskRepo.save(task);
    }

    //

    async create(createTaskInput: CreateTaskInput): Promise<Task> {
        const user = await this.userRepo.findOne(createTaskInput.userId);
        if(!user){
            return null;
        }
        console.log("HERE")
        const newTask = this.taskRepo.create(createTaskInput);
        return this.taskRepo.save(newTask);
    }

    async findTasksByUser(userId: number, done: boolean): Promise<Task[]>{
        const user = await this.userRepo.findOne(userId);
        if(user === null){
            return null//new Error("User not found");
        }
        return this.taskRepo.findByUserDone(userId, done);
    }

    async findTasksAllByUser(userId: number): Promise<Task[]>{
        const user = await this.userRepo.findOne(userId);
        if(user === null){
            return null//new Error("User not found");
        }
        return this.taskRepo.find( {userId} );
    }

    async findByUser(userId: number, taskId: number):Promise<Task> {
        const user = await this.userRepo.findOne(userId);
        if(user === null){
            return null
        }
        return this.taskRepo.findOneByUserTask( userId, taskId );
    }

}
