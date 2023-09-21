import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
// import { LoginDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards( AuthGuard('local') )
  @Post('login')
  login(@Request() req: Express.Request) {
    return this.authService.login(req.user);
  }

}
