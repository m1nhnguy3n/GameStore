/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, Injectable } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';
import { UserService } from 'src/user/user.service';

@Injectable()
export class EmailverifyService {
  constructor(
    private mailerService: MailerService,
    private userService: UserService,
  ) {}
  async sendEmailVerify(email: string, lastName: string) {
    const payload = { email };

    const token = await sign(
      payload,
      process.env.JWT_VERIFICATION_TOKEN_SECRET,
      {
        expiresIn: '600s',
      },
    );

    const url = `${process.env.EMAIL_CONFIRMATION_URL}/${token}`;

    return this.mailerService
      .sendMail({
        to: email,
        from: 'minhnngcd191326@fpt.edu.vn',
        subject: 'Welcome to Game Store',
        text: 'Welcome',
        html: `<b>Welcome to Game Store</b></br><p>Hi ${lastName}, Let's confirm your email address.</p></br><a href="${url}">Confirm Email Address</a>`,
      })
      .then(() => {})
      .catch(() => {});
  }

  async confirmVerify(email: string) {
    const user = this.userService.findByEmail(email);
    if ((await user).isEmailValidated) {
      throw new BadRequestException('Email already confirmed');
    }
    return this.userService.markEmailAsConfirmed(email);
  }

  async decodeConfirmationToken(token: string) {
    try {
      const payload = verify(token, process.env.JWT_VERIFICATION_TOKEN_SECRET);

      if (typeof payload === 'object' && 'email' in payload) {
        return payload.email;
      }
      throw new BadRequestException();
    } catch (error) {
      if (error?.name === 'TokenExpiredError') {
        throw new BadRequestException('Email confirmation token expired');
      }
      throw new BadRequestException('Bad confirmation token');
    }
  }

  async sendMailForResetPassword(email: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new BadRequestException();
    }

    const token = sign(email, process.env.JWT_RESETPASSWORD_TOKEN_SECRET);

    const url = `${process.env.RESET_PASSWORD_URL}/${token}`;

    return this.mailerService
      .sendMail({
        to: email,
        from: 'minhnngcd191326@fpt.edu.vn',
        subject: 'Reset password for Game Store account',
        text: 'Reset password',
        template: './welcome.hbs',
        context: {
          name: user.lastName,
          url: url,
        },
      })
      .then(() => {})
      .catch(() => {});
  }
}
