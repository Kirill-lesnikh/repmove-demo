import { APIResponse } from "@playwright/test"
import { Industry } from "data/enums"
import { RegisterUserArgs, UserCreatedResponse } from "api/schemas/user"
import { faker } from '@faker-js/faker'
import { generateRandomString } from 'utils/string'


type UserCredentials = {
    email: string,
    password: string
}


export class RepmoveUser {
    credentials: UserCredentials
    responseReult?: UserCreatedResponse
    private constructor() {}

    static async fromApiResponse(response: APIResponse, password: string): Promise<RepmoveUser> {
        const responseBody = await response.json() as UserCreatedResponse
        const user = new RepmoveUser()
        user.responseReult = responseBody
        user.credentials = {email: responseBody.result.email, password: password}
        return user
    }

    static fromCredentials(credentials: UserCredentials): RepmoveUser {
        const user = new RepmoveUser()
        user.credentials = credentials
        return user
    }

    static generateRegistrationData(): RegisterUserArgs {
        const fistName = faker.person.firstName()
        const lastName = faker.person.lastName()
        const companyName = faker.company.name()
        const password = faker.internet.password()
        const industry = Industry.Medical
        const email = `repmovetest+${generateRandomString(10)}@mailinator.com`
        return {fistName, lastName, companyName, password, industry, email}
    }
}