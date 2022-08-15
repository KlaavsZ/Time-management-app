import { UseGuards } from "@nestjs/common";
import { Args, Int, Mutation, Parent, Query, ResolveField } from "@nestjs/graphql";
import { Resolver } from "@nestjs/graphql";
import { JwtAuthGuard } from "src/auth/jwt.guard";
import { User } from "src/user/user.entity";
import { DeleteResult } from "typeorm";
import { CreateTaskInput } from "./dto/create-task.input";
import { UpdateTaskInput } from "./dto/update-task.input";
import { Task } from './task.entity'
import { TaskService } from "./task.service";

@Resolver(of => Task)
export class TaskResolver{
    constructor(private taskService: TaskService ) {}

    @Query(returns => [Task])
    @UseGuards(JwtAuthGuard)
    tasks(): Promise<Task[]>{
        return this.taskService.findAll()
    }

    @Query(returns => Task)
    @UseGuards(JwtAuthGuard)
    getTask(@Args('id', {type: () => Int}) id:number): Promise<Task>{
        return this.taskService.findOne(id);
    }

    @Query(returns => [Task])
    @UseGuards(JwtAuthGuard)
    getTasks(@Args('done', {type: () => Boolean}) done: boolean): Promise<Task[]>{
        return this.taskService.findTasks(done);
    }

    @Query(returns => Task)
    @UseGuards(JwtAuthGuard)
    getTaskByUser(@Args('userId', {type: () => Int}) userId: number,
                @Args('taskId', {type: () => Int}) taskId: number):Promise<Task>{
        return this.taskService.findByUser(userId, taskId);
                }
    
                    

    @Query(returns => [Task])
    @UseGuards(JwtAuthGuard)
    getTasksByUserId(@Args('done',{type: () => Boolean}) done: boolean, 
                    @Args('userId', {type: () => Int}) userId: number): Promise<Task[]>{
        return this.taskService.findTasksByUser(userId, done);
    }

    @Query(returns => [Task])
    @UseGuards(JwtAuthGuard)
    getAllTasksByUserId(@Args('userId', {type: () => Int}) userId: number):Promise<Task[]> {
        return this.taskService.findTasksAllByUser(userId);
    }

    @ResolveField(returns => User)
    user(@Parent() task:Task): Promise<User>{
        return this.taskService.getUser(task.userId);
    }


    @Mutation(returns => Task)
    @UseGuards(JwtAuthGuard)
    createTask(@Args('input') input: CreateTaskInput): Promise<Task> {
        return this.taskService.create(input);
    }

    @Mutation(returns => Task)
    @UseGuards(JwtAuthGuard)
    updateTask(@Args('id', {type: () => Int}) id: number, @Args('input') input: UpdateTaskInput): Promise<Task>{
        console.log("update")
        return this.taskService.update(id, input);
    }

    @Mutation(returns => Boolean)
    @UseGuards(JwtAuthGuard)
    deleteTask(@Args('id', {type: () => Int}) id: number ): Promise<boolean>{
        return this.taskService.remove(id);

    }

    @Mutation(returns => Task)
    @UseGuards(JwtAuthGuard)
    setTaskDone(@Args('id', {type: () => Int}) id:number, @Args('done') done: boolean):Promise<Task> {
        return this.taskService.setDone(id, done);
    }

    //

    
    

}
