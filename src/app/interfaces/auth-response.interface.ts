export interface IAuthResponse {
    accessToken: string,
    refreshToken: string,
    tokenType: string,
    expiresIn: number
}