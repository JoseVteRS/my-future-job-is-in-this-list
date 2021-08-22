import { Inject } from '@nestjs/common';

export const DITokenJobRepository = Symbol('IJobRepository');
export const InjectJobRepository = () => Inject(DITokenJobRepository);
