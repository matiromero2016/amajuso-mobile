export interface IUser {
        id?: string,
        email?: string,
        password?: string,
        name?: string,
        lastName?: string,
        hasPassword?: boolean,
        hasGoogle?: boolean,
        hasFacebook?: boolean,
        googleGuid?: string,
        facebookGuid?: string,
        phone?: string,
        genderId?: number,
        birthday?: Date,
        terms?: number,
        type?: string,
        role?: string,
    }
    
