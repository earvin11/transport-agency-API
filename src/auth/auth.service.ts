import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { LoginDto } from './dto/login-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser( loginDto: LoginDto ) {
    const user = await this.usersService.findOne( loginDto.email );

    if(user && bcrypt.compareSync( loginDto.password, user.password )){
      const { password, ...result } = user;
      return result;
    };

    return null;
  }

  async login(user: any) {
    const payload = { sub: user.uuid };
    const { password, __v, _id, ...dataUser} = user._doc;
    return {
      access_token: this.jwtService.sign( payload ),
      user: dataUser,
    };
  }

}