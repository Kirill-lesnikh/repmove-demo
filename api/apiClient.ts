import { URL } from "url"
import { apiConfig } from "config/apiConfig"
import { endpoints } from "./endpoints"
import { Industry } from "data/enums"
import { APIRequestContext, APIResponse } from "@playwright/test"
import { RepmoveUser } from "data/users"
import { RegisterUserArgs } from "./schemas/user"


export class ApiClient {
    host: URL
    request: APIRequestContext

    constructor(request: APIRequestContext) {
        this.host = apiConfig.host
        this.request = request
    }

    async registerUser(data: RegisterUserArgs): Promise<RepmoveUser> {
        const url = new URL(endpoints.registerUser, this.host)
        const payload = {
            data: {
                firstName: data.fistName,
                lastName: data.lastName,
                companyName: data.companyName,
                password: data.password,
                phone: {
                    "country": "ua",
                    "number": "380631234567"
                },
                industry: data.industry,
                email: data.email,
                type: "[AUTH] Sign up"
            }
        }
        const headers = {
            'content-type': 'application/json',
            'user-agent': 'automation_task_demo'
        }
        const response: APIResponse = await this.request.post(url.href, {
            headers: headers,
            data: payload
        })

        if (!response.ok()) {
            const responseText = await response.text()
            throw new Error(`Failed to register a user: ${responseText}`);
        }


        return RepmoveUser.fromApiResponse(response, data.password)
    }
}