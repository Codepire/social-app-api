import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID, MaxLength, MinLength } from 'class-validator';

@InputType()
export class ValidateOtpInput {
    @IsNotEmpty()
    @MaxLength(6)
    @MinLength(6)
    @Field()
    otp: string;

    @Field()
    @IsUUID('4')
    user_id: string;
}
