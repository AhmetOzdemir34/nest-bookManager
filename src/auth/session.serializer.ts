import {Injectable} from '@nestjs/common';
import {PassportSerializer} from '@nestjs/passport';
import { UserService } from 'src/user/user.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
    
    constructor(private readonly userService:UserService){
        super();
    }

    serializeUser(user: any, done: (err:Error, user:any)=> void) : any {        
        done(null, user);
    }

    async deserializeUser(payload: any, done: (err:Error, payload:string)=> void) : Promise<any> { //kullanıcıyı döndür
                
        done(null, payload);
    }
}