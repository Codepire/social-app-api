import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';
import { gender_enum } from 'src/common/enums';
import { UserEntity } from 'src/user/entities/user.entity';

@InputType()
export class RegisterUserInput extends PartialType(UserEntity) {
    @Field()
    @IsNotEmpty()
    username: string;

    @Field()
    @IsEmail()
    email: string;

    @Field()
    @IsNotEmpty()
    password: string; //todo: make strong password validation

    @Field({ nullable: true })
    bio?: string;

    @Field({
        nullable: true,
        description: "S3 or any other provider's picture url",
    })
    profile_url?: string;

    @Field(() => gender_enum, { nullable: true })
    gender?: gender_enum;

    @Field()
    @IsPhoneNumber('IN')
    mobile_no: string;
}
