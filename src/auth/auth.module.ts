import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';
import {PassportModule} from '@nestjs/passport';
import { SessionSerializer } from './session.serializer';

@Module({
  providers: [AuthService, LocalStrategy, SessionSerializer],
  imports: [UserModule, PassportModule.register({session:true})],
  controllers: [AuthController]
})
export class AuthModule {}
