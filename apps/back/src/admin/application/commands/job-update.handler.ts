import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { JobUpdateCommand } from '@back/admin/application/commands/job-update.command';
import { JobUpdateUsecase } from '@back/admin/application/use-cases/write/job-update.usecase';
import { VOTitle } from '@back/admin/domain/value-objects/title.vo';
import { VODescription } from '@back/admin/domain/value-objects/description.vo';
import { VOString } from '@shared-kernel/common/domain/value-objects/string.vo';
import { VOExtraInformation } from '@back/admin/domain/value-objects/extra-information.vo';

@CommandHandler(JobUpdateCommand)
export class JobUpdateCommandHandler
  implements ICommandHandler<JobUpdateCommand> {
  constructor(private readonly jobUpdateUseCase: JobUpdateUsecase) {}

  execute(command: JobUpdateCommand) {
    return this.jobUpdateUseCase.execute(
      command.jobId,
      command.title ? new VOTitle(command.title) : null,
      command.url ? new VODescription(command.title) : null,
      command.extraInformation
        ? new VOExtraInformation(command.description)
        : null,
      command.description ? new VOString(command.title) : null
    );
  }
}
