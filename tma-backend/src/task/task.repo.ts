import { User } from "src/user/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { Task } from "./task.entity";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task>{

    findByUserDone(userId: number ,done: boolean){
        return this.createQueryBuilder("task")
            .where("task.done = :done", {done})
            .andWhere("task.userId = :userId", {userId})
            .getMany()
    }

    findOneByUserTask(userId: number, taskId: number){
        return this.createQueryBuilder("task")
            .where("task.userId = :userId", {userId})
            .andWhere("task.id = :taskId", {taskId})
            .getOne()
    }
}   

