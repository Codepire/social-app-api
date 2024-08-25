import { registerEnumType } from '@nestjs/graphql';

export enum gender_enum {
    MALE = 'male',
    FEMALE = 'female',
    OTHER = 'other',
}

export enum otp_types_enum {
    SIGN_UP = 'sign up',
    FORGOT_PASSWORD = 'forgot password',
}

registerEnumType(gender_enum, {
    name: 'gender_enum',
});

registerEnumType(otp_types_enum, {
    name: 'otp_types_enum',
});
