import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService){}

    async validateUser(username:string, password:string): Promise<any>{
        const user = await this.userService.findByUsername(username);
        
        /* if(user && user.password === password){
            return user;
        } */

        if(user){
            const result = await bcrypt.compare(password, user.password);
            if(result){
                return user
            }
        }
        return null;
    }
}
