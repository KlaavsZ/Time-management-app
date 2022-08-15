import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppService } from './app.service';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault, ApolloServerPluginLandingPageLocalDefaultOptions } from 'apollo-server-core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity'
import { Task } from './task/task.entity'
import { join } from 'path';
import { TaskResolver } from './task/task.resolver';
import { TaskModule } from './task/task.module';
import { TaskService } from './task/task.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { EventModule } from './event/event.module';
import { GraphQLError,  GraphQLFormattedError } from 'graphql';


@Module({
  imports: [
  GraphQLModule.forRoot<ApolloDriverConfig>({
    playground: false,
    driver: ApolloDriver,
    autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    plugins: [ApolloServerPluginLandingPageLocalDefault()],
  }),  
  TypeOrmModule.forRoot({    
    type: "postgres",
    host: "localhost",
    port: 4000,
    username: "postgres",
    password: "postgresPASS",
    database: "tma-db",
    entities: ['dist/src/**/*.entity{.js,.ts}', User, Task],
    autoLoadEntities:true,
    synchronize: true,
  }),TaskModule,UserModule,
  AuthModule, EventModule,
  ],
  providers: [AppService],
  })
export class AppModule {}
