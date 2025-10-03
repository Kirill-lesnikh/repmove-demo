import { Industry } from "data/enums"

export type UserCreatedResponse = {
    result: {
        id: string,
        userId: string,
        accountId: string,
        createdAt: EpochTimeStamp,
        updatedAt: EpochTimeStamp,
        updatedById: string,
        type: number,
        reportToId: unknown | null,
        email: string,
        displayName: string,
        companyName: string,
        industry: string,
        phoneNumber: string,
        phoneCountry: string,
        photoURL: string | null,
        disabled: boolean
    }
}

export type UserAlreadyExistsResponse = {
    error: {
        message: 'User already exists',
        status: 'ALREADY_EXISTS'
    }
}


export type RegisterUserArgs = {
    fistName: string,
    lastName: string,
    companyName: string,
    password: string,
    industry: Industry,
    email: string
}