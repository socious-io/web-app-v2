import { post } from "../../../core/http";


export async function login(email: string, password: string) {
    const body = {
        email,
        password
    }

    return post('/auth/web/login', body).then(({ data }) => data);
}

export async function deleteAccount(reason: string) {
    const body = {
        reason
    }

    return post('/user/delete', body).then(({ data }) => data);
}