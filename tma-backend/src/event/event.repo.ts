import { EntityRepository, Repository } from "typeorm";
import { Event } from "./event.entity";

@EntityRepository(Event)
export class EventRepository extends Repository<Event>{
    findOneByUserId(userId: number, taskId: number){
        return this.createQueryBuilder("event")
        .where("event.userId = :userId", {userId})
        .andWhere("event.id = :taskId", {taskId})
        .getOne()
    }
}