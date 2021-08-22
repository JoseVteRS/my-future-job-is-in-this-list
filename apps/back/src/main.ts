import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './config/app/app.module';
import { text as figletText } from 'figlet';
import { ConfigService } from '@nestjs/config';
import { CommonEnv } from '@shared-kernel/common/infrastructure/enums/common-env.enum';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService: ConfigService = app.get(ConfigService);

  const port: number = configService.get<string>(CommonEnv.SELF_DOMAIN)
    ? Number(configService.get<string>(CommonEnv.PORT))
    : 3000;

  const self_domain: string = configService.get<string>(CommonEnv.SELF_DOMAIN)
    ? (configService.get<string>(CommonEnv.SELF_DOMAIN) as string)
    : 'http://localhost';


  app.enableCors();

  await app.listen(port);

  figletText('MY FUTURE JOB IS IN THIS LIST\n=> back', function (err, data) {
    if (err) return;
    Logger.debug('\n' + data);
  });

  Logger.log(`Application is running on ${self_domain}:${port}`, 'Main');
}

bootstrap();
