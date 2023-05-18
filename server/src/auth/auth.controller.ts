/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Ip,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { EmailverifyService } from 'src/emailverify/emailverify.service';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { EmailDto } from './dto/check-email.input';
import { CheckUserInput } from './dto/check-user.input';
import { CreateUserInput } from './dto/create-user.input';
import { LoginDto } from './dto/login.dto';
import RefreshTokenDto from './dto/refresh-token.dto';
import SetNewPasswordDto from './dto/set-new-password.input';
import { JwtAuthGuardApi } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private userService: UserService,
    private emailverifyService: EmailverifyService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() request, @Ip() ip: string, @Body() body: LoginDto) {
    return this.authService.login(body.email, {
      ipAddress: ip,
      userAgent: request.headers['user-agent'],
    });
  }

  @Post('checkregister')
  async checkInputRegister(@Body() checkUserInput: CheckUserInput) {
    return this.userService.checkCreateUser(checkUserInput);
  }

  @UseGuards(JwtAuthGuardApi)
  @Get('me')
  async reload(@Req() request) {
    return this.userService.getUserById(request.user.userId);
  }

  @Post('register')
  async register(@Body() createUserInput: CreateUserInput) {
    console.log(createUserInput);
    await this.userService.createUser(createUserInput);
    await this.emailverifyService.sendEmailVerify(
      createUserInput.email,
      createUserInput.lastName,
    );
    return 'Register successfully!';
  }

  @Post('refresh')
  async refreshToken(@Body() body: RefreshTokenDto) {
    return this.authService.refresh(body.refreshToken);
  }

  @Delete('logout')
  async logout(@Body() body: RefreshTokenDto) {
    return this.authService.logout(body.refreshToken);
  }

  // @UseGuards(JwtAuthGuardApi)
  @Post('forgot-password')
  async sendMailForResetPassword(@Body() dto: EmailDto) {
    return this.emailverifyService.sendMailForResetPassword(dto.email);
  }

  @Get('reset-password/:token')
  resetPassWordResendToken(@Param('token') token) {
    return { resetPassWordToken: token };
  }

  @Post('set-newpassword')
  async setNewPassword(@Body() setNewPasswordDto: SetNewPasswordDto) {
    return await this.userService.setNewPassword(setNewPasswordDto);
  }
}
