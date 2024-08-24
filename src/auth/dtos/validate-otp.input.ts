import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID, MaxLength, MinLength } from 'class-validator';
import { otp_types_enum } from 'src/common/enums';

@InputType()
export class ValidateOtpInput {
    @IsNotEmpty()
    @MaxLength(6)
    @MinLength(6)
    @Field()
    otp: string;

    @Field(() => otp_types_enum)
    @IsNotEmpty()
    otp_type: otp_types_enum;

    @Field()
    @IsUUID('4')
    user_id: string;
}
