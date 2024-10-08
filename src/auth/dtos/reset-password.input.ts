import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';

@InputType()
export class ResetPasswordInput {
    @Field()
    @IsEmail()
    email: string;

    @Field()
    @IsNotEmpty()
    otp: string;

    @Field()
    @IsNotEmpty()
    password: string; //todo: make strong password validation
}
