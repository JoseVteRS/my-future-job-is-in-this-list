import { VOUuid } from '@shared-kernel/common/domain/value-objects/uuid.vo';
import { ICommand } from '@nestjs/cqrs';



export class JobExtraInformationUpdateCommand implements ICommand {
    constructor(
        public jobId: VOUuid,
        public extraInformation: string
    ) { }
}