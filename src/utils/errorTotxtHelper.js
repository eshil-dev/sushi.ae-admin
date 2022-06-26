export const EMAIL_IS_EMPTY = 'EMAIL_IS_EMPTY';
export const PASSWORD_IS_EMPTY = 'PASSWORD_IS_EMPTY';
export const PASSWORD_LENGTH_MUST_BE_MORE_THAN_8 = 'PASSWORD_LENGTH_MUST_BE_MORE_THAN_8';
export const WRONG_PASSWORD = 'WRONG_PASSWORD';
export const SOME_THING_WENT_WRONG = 'SOME_THING_WENT_WRONG';
export const USER_EXISTS_ALREADY = 'USER_EXISTS_ALREADY';
export const USER_DOES_NOT_EXIST = 'USER_DOES_NOT_EXIST';
export const TOKEN_IS_EMPTY = 'TOKEN_IS_EMPTY';
export const EMAIL_IS_IN_WRONG_FORMAT = 'EMAIL_IS_IN_WRONG_FORMAT';

export const errorToTxt = (err) => {
    switch (err) {
        case EMAIL_IS_EMPTY:
            return 'Email is Empty';
        case PASSWORD_IS_EMPTY:
            return 'Password is Empty';
        case PASSWORD_LENGTH_MUST_BE_MORE_THAN_8:
            return 'Password length must be more than 8 character';
        case WRONG_PASSWORD:
            return 'Password is wrong';
        case SOME_THING_WENT_WRONG:
            return 'Something went wrong';
        case USER_EXISTS_ALREADY:
            return 'User already exist';
        case USER_DOES_NOT_EXIST:
            return 'User does not exist';
        case TOKEN_IS_EMPTY:
            return 'Token is empty';
        case EMAIL_IS_IN_WRONG_FORMAT:
            return 'Email is in wrong format'
    }
}
