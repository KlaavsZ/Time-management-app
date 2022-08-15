import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApolloError, ValidationError } from 'apollo-server-express';
import { graphql, GraphQLError } from 'graphql';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { CreateEventInput } from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event.input';
import { Event } from './event.entity';
import { EventRepository } from './event.repo';

@Injectable()
export class EventService {
    constructor(
        private eventRepo: EventRepository,
        @InjectRepository(User) private userRepo: Repository<User>
    ){}

    async findAll(): Promise<Event[]> {
        return this.eventRepo.find();
    }

    async findOne(id:number): Promise<Event>{
        return this.eventRepo.findOneOrFail(id);
    }

    async create(createEventInput: CreateEventInput): Promise<Event> {
        const user = this.userRepo.findOne(createEventInput.userId);
        if(!user) throw Error("User not found");
        const newEvent = this.eventRepo.create(createEventInput);
        return this.eventRepo.save(newEvent)
    }

    async update(id: number, updateEventInput: UpdateEventInput): Promise<Event> {
        const event = await this.eventRepo.findOne(id);
        if(!event) return null
        event.title = updateEventInput.title;
        event.start = updateEventInput.start;
        event.end = updateEventInput.end;
        return this.eventRepo.save(event)
    }

    async remove (id: number) {
        const event = await this.eventRepo.findOne(id);
        if(!event) return false;
        this.eventRepo.delete(id);
        return true;
    }

    async getUser(userId:number): Promise<User> {
        return this.userRepo.findOne(userId);
    }

    async findAllEventsByUser(userId: number): Promise<Event[]>{
        const user = await this.userRepo.findOne(userId);
        if(!user) throw ValidationError
        return this.eventRepo.find( {userId} );
    }

    async findByUser(userId: number, eventId: number): Promise<Event>{
        const user = await this.userRepo.findOne(userId);
        if(!user) return null;
        return this.eventRepo.findOneByUserId(userId, eventId)
    }
}
