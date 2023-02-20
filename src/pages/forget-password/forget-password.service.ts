import { get, post } from "../../core/http";

export async function forgetPassword(email: string) {
    const body = {
        email
    }

    return post('/auth/forget-password', body).then(({ data }) => data);
}

export async function confirm(email: string, code: string) {
    return get(`/auth/otp/confirm/web?email=${email}&code=${code}`).then(({ data }) => data);
}

export async function changePassword(password: string) {
    const body = {
        password
    }

    return post('/user/change-password-direct', body).then(({ data }) => data);
}