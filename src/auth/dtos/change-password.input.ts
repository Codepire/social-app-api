import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class ChangePasswordInput {
    @Field()
    @IsNotEmpty()
    old_password: string;

    @Field()
    @IsNotEmpty()
    new_password: string; //todo: make strong password validation
}
