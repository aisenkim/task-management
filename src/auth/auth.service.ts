import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { JwtPayload } from './jwt-payload.interface';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');

  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialDto: AuthCredentialsDto) {
    return this.userRepository.signUp(authCredentialDto);
  }

  async signIn(
    authCredentialDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const username = await this.userRepository.validateUserPassword(
      authCredentialDto,
    );
    if (!username) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    // at this point, we know username && password is correct
    // process of creating token
    // (try not to have info too sensitive)
    const payload: JwtPayload = { username };
    const accessToken = await this.jwtService.sign(payload);

    this.logger.debug(
      `Generated JWT Token with payload ${JSON.stringify(payload)}`,
    );

    return { accessToken };
  }
}
