import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import serverlessExpress from '@vendia/serverless-express';
import { Callback, Context, Handler } from 'aws-lambda';

let server: Handler;

export const handler = async (
  event: any,
  context: Context,
  callBack: Callback,
) => {
  if (!server) {
    const nestApp = await NestFactory.create(AppModule);
    await nestApp.init();
    server = serverlessExpress({
      app: nestApp.getHttpAdapter().getInstance(),
    });
  }

  return server(event, context, callBack);
};
