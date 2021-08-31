import { Injectable } from '@nestjs/common';
import { IUseCase } from '@shared-kernel/common/application/interfaces/use-case.interface';
import { InjectJobRepository } from '@back/admin/domain/repository/job-repository.ditoken';
import { IJobRepository } from '@back/admin/domain/repository/job-repository.interface';
import { VOUuid } from '@shared-kernel/common/domain/value-objects/uuid.vo';

@Injectable()
export class JobByIdUsecase implements IUseCase {
  constructor(
    @InjectJobRepository()
    private readonly jobRepository: IJobRepository
  ) {}

  async execute(jobId: VOUuid) {
    return await this.jobRepository.findById(jobId);
  }
}
