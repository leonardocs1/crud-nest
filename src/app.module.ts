import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { DatabaseModule } from './database/database.module'
import { ProductModule } from './module/product/product.module'
import { GraphQLModule } from '@nestjs/graphql'

@Module({
  imports: [DatabaseModule.forRoot(), 
    GraphQLModule.forRoot({
    autoSchemaFile: 'schema.gql',
  }), ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
