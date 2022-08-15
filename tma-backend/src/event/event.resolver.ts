import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { User } from 'src/user/user.entity';
import { CreateEventInput } from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event.input';
import { Event } from './event.entity';
import { EventService } from './event.service';

@Resolver(of => Event)
export class EventResolver {
    constructor(private eventService: EventService){}
    
    @Query(returns => [Event])
    @UseGuards(JwtAuthGuard)
    events():Promise<Event[]>{
        return this.eventService.findAll()
    }

    @Query(returns => Event)
    @UseGuards(JwtAuthGuard)
    getEvent(@Args('id', {type: () => Int}) id:number): Promise<Event>{
        return this.eventService.findOne(id);
    }

    @Query(returns => Event)
    @UseGuards(JwtAuthGuard)
    getEventByUser(@Args('userId', {type: () => Int}) userId: number,
        @Args('eventId', {type: () => Int}) eventId: number){
            return this.eventService.findByUser(userId, eventId)
        }

    @Query(returns => [Event])
    @UseGuards(JwtAuthGuard)
    getAllEventsByUser(@Args ('userId', {type: () => Int}) userId:number):Promise<Event[]>{
        return this.eventService.findAllEventsByUser(userId);
    }

    //ADDS NESTED QUERY TO SHOW EVENT USER DETAILS
    @ResolveField(returns => User)
    user(@Parent() event:Event): Promise<User>{
        return this.eventService.getUser(event.id)
    }

    @Mutation(returns => Event)
    @UseGuards(JwtAuthGuard)
    createEvent(@Args('createEventInput',) createEventInput: CreateEventInput):Promise<Event>{
        return this.eventService.create(createEventInput);
    }

    @Mutation(returns => Event)
    @UseGuards(JwtAuthGuard)
    updateEvent(@Args('id', {type: () => Int}) eventId: number,
        @Args('updateEventInput') updateEventInput: UpdateEventInput):Promise<Event>{
        return this.eventService.update(eventId, updateEventInput);
    }

    @Mutation(returns => Boolean)
    @UseGuards(JwtAuthGuard)
    deleteEvent(@Args('id', {type: () => Int}) id: number):Promise<Boolean>{
        return this.eventService.remove(id);
    }

}
