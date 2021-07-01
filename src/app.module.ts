import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as ormOptions from './config/orm';

import RepoModule from './repo.module';

import UserResolver from './resolvers/user.resolver';
import { GraphQLModule } from '@nestjs/graphql';
import MessageResolver from './resolvers/message.resolver';

const gqlImports = [UserResolver, MessageResolver];

@Module({
  imports: [
    TypeOrmModule.forRoot(ormOptions),
    RepoModule,
    ...gqlImports,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      playground: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
