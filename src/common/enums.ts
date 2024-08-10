import { registerEnumType } from '@nestjs/graphql';

export enum gender_enum {
    MALE = 'male',
    FEMALE = 'female',
    OTHER = 'other',
}

registerEnumType(gender_enum, {
    name: 'gender_enum',
});
