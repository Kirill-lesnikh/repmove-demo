import { URL } from "url"


export const apiConfig = {
    host: (() => {
        const host = process.env.REPMOVE_API_HOST
        const url = URL.parse(host)
        if (url === null) {
            throw Error(`Failed to parse host: ${host}`)
        }
        return url
    })()
}