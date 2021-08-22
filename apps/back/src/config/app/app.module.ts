
import { Module } from "@nestjs/common";
import { AdminModule } from '../../admin/admin.module';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CqrsModule,
    AdminModule
  ],
  controllers: [],
  providers: []
})
export class AppModule { }
