import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, ValidateIf } from 'class-validator';
import { chat_types_enum } from 'src/common/enums';

@InputType()
export class CreateChatInput {
    @Field({ nullable: true })
    @ValidateIf((o) => o.name !== null && o.name !== undefined)
    @IsNotEmpty()
    name: string;

    @Field({ nullable: true })
    @ValidateIf((o) => o.profile_url !== null && o.profile_url !== undefined)
    @IsNotEmpty()
    profile_url?: string;

    @Field({ nullable: true })
    @ValidateIf((o) => o.bio !== null && o.bio !== undefined)
    @IsNotEmpty()
    bio?: string;

    @Field({ nullable: true })
    type: chat_types_enum;
}
