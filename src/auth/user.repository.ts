import {EntityRepository, Repository} from "typeorm";
import {AuthCredentialsDto} from "./dto/auth-credential.dto";
import {User} from "./user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async signUp(authCredentialDto: AuthCredentialsDto): Promise<void> {
        const {username, password} = authCredentialDto;
        
        const user = new User();
        user.username = username;
        user.password = password;

        await user.save();
    }
}


