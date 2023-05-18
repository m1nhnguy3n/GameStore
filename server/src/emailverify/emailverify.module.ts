/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { EmailverifyController } from './emailverify.controller';
import { EmailverifyService } from './emailverify.service';

@Module({
  imports: [UserModule],
  controllers: [EmailverifyController],
  providers: [EmailverifyService],
  exports: [EmailverifyService],
})
export class EmailverifyModule {}
