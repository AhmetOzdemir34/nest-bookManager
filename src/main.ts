import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from '@nestjs/common';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin:process.env.ORIGIN,
    credentials:true
  });

  app.useGlobalPipes(new ValidationPipe());

  app.use(
    session({
      secret:process.env.SESSION_SECRET, 
      resave:false,
      key:'SESSION_KEY',
      saveUninitialized: false,
      cookie: {maxAge: 3600000},
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  const port = process.env.PORT; 
  await app.listen(port);
}
bootstrap();
