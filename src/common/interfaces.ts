import { ISendMailOptions } from '@nestjs-modules/mailer';

export interface ISendMailOption extends ISendMailOptions {
    type: 'WELCOME' | 'REGISTER_OTP' | 'RESET_PASSWORD_OTP';
}
