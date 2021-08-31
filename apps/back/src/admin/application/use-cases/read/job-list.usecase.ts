import { IUseCase } from '@shared-kernel/common/application/interfaces/use-case.interface';
import { InjectJobRepository } from '@back/admin/domain/repository/job-repository.ditoken';
import { IJobRepository } from '@back/admin/domain/repository/job-repository.interface';
import {Injectable} from '@nestjs/common';


@Injectable()
export class JobListUsecase implements IUseCase {
  constructor(
    @InjectJobRepository()
    private readonly jobRepository: IJobRepository
  ) {}

  async execute() {
    return await this.jobRepository.findAll();
  }
}
