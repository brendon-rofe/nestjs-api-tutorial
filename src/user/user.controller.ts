import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { JwtGuard } from 'src/auth/guard';

@Controller('users')
export class UserController {
  @UseGuards(JwtGuard)
  @Get('me')
  getMe(user: User) {
    return user;
  }
}
