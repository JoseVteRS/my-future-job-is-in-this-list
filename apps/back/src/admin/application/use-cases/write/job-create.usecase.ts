import { IUseCase } from '@shared-kernel/common/application/interfaces/use-case.interface';
import { InjectJobRepository } from '@back/admin/domain/repository/job-repository.ditoken';
import { IJobRepository } from '@back/admin/domain/repository/job-repository.interface';
import { VOUuid } from '@shared-kernel/common/domain/value-objects/uuid.vo';
import { VOTitle } from '@back/admin/domain/value-objects/title.vo';
import { VODescription } from '@back/admin/domain/value-objects/description.vo';
import { VOString } from '@shared-kernel/common/domain/value-objects/string.vo';
import { VOBoolean } from '@shared-kernel/common/domain/value-objects/boolean.vo';
import { JobModel } from '@back/admin/domain/model/job.model';
import { Injectable } from '@nestjs/common';
import { VOStatus } from '@back/admin/domain/value-objects/status.vo';

@Injectable()
export class JobCreateUsecase implements IUseCase {
  constructor(
    @InjectJobRepository()
    private readonly jobRepository: IJobRepository
  ) {}

  async execute(
    jobId: VOUuid,
    title: VOTitle,
    description: VODescription | null,
    url: VOString | null,
    status: VOStatus | null,
    isChecked: VOBoolean | null
  ) {
    const job = JobModel.create(
      jobId,
      title,
      description,
      url,
      status,
      isChecked
    );
    await this.jobRepository.create(job);
  }
}
