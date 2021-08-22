import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { BD_ADMIN_Job_Providers } from '@back/admin/infrastructure/providers/job.providers';
import { MongoDBModule } from '@back/config/monodb/mongodb.module';
import { GqlModule } from '@back/config/graphql/graphql.module';

@Module({
  imports: [CqrsModule, MongoDBModule, GqlModule],
  providers: [...BD_ADMIN_Job_Providers],
})
export class AdminModule {}
