import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { JobCreateUsecase } from '@back/admin/application/use-cases/write/job-create.usecase';
import { JobCreateCommand } from '@back/admin/application/commands/job-create.command';
import { VOUuid } from '@shared-kernel/common/domain/value-objects/uuid.vo';
import { VODescription } from '@back/admin/domain/value-objects/description.vo';
import { VOTitle } from '@back/admin/domain/value-objects/title.vo';
import { VOString } from '@shared-kernel/common/domain/value-objects/string.vo';
import { VOStatus } from '@back/admin/domain/value-objects/status.vo';
import { JobStatusEnum } from '@back/admin/domain/enums/job-status.enum';
import { VOExtraInformation } from '@back/admin/domain/value-objects/extra-information.vo';

@CommandHandler(JobCreateCommand)
export class JobCreateCommandHandler
  implements ICommandHandler<JobCreateCommand> {
  constructor(private readonly jobCreateUseCase: JobCreateUsecase) {}

  async execute(command: JobCreateCommand): Promise<void> {
    return this.jobCreateUseCase.execute(
      await VOUuid.create(),
      new VOTitle(command.title),
      command.description
        ? new VODescription(command.description)
        : new VODescription(''),
      command.extraInformation
        ? new VOExtraInformation(command.extraInformation)
        : new VOExtraInformation(''),
      command.url ? new VOString(command.url) : new VOString(''),
      command.status
        ? new VOStatus(command.status)
        : new VOStatus(JobStatusEnum.NO_SENDED)
    );
  }
}
