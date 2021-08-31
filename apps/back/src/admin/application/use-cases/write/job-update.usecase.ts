import { IUseCase } from '@shared-kernel/common/application/interfaces/use-case.interface';
import { InjectJobRepository } from '@back/admin/domain/repository/job-repository.ditoken';
import { IJobRepository } from '@back/admin/domain/repository/job-repository.interface';
import { VOUuid } from '@shared-kernel/common/domain/value-objects/uuid.vo';
import { VOTitle } from '@back/admin/domain/value-objects/title.vo';
import { VODescription } from '@back/admin/domain/value-objects/description.vo';
import { VOExtraInformation } from '@back/admin/domain/value-objects/extra-information.vo';
import { VOString } from '@shared-kernel/common/domain/value-objects/string.vo';
import { JobNotFoundException } from '@back/admin/domain/exceptions/job-not-found.exception';
import { Injectable } from '@nestjs/common';


@Injectable()
export class JobUpdateUsecase implements IUseCase {
  constructor(
    @InjectJobRepository()
    private readonly jobRepository: IJobRepository
  ) {}

  async execute(
    jobId: VOUuid,
    title: VOTitle,
    description: VODescription,
    extraInformation: VOExtraInformation,
    url: VOString
  ) {
    const jobById = await this.jobRepository.findById(jobId);
    if (!jobById) throw new JobNotFoundException();

    jobById.update(title, description, extraInformation, url);
    await this.jobRepository.update(jobById);
  }
}
