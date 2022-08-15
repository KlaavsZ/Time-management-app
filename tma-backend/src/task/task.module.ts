import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskService } from './task.service';
import { Task } from './task.entity'
import { TaskResolver } from './task.resolver';
import { TaskRepository } from './task.repo';
import { User } from 'src/user/user.entity';
import { Event } from 'src/event/event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaskRepository, Task, User])],
  providers: [TaskService, TaskResolver, ]
})
export class TaskModule {}
