import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventResolver } from './event.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './event.entity';
import { User } from 'src/user/user.entity';
import { EventRepository } from './event.repo';

@Module({
  imports: [TypeOrmModule.forFeature([EventRepository, Event, User])],
  providers: [EventService, EventResolver]
})
export class EventModule {}
