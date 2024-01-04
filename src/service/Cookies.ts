import Cookies from "universal-cookie";

const expirationTime: Date = new Date(new Date().getTime() + 15 * 60 * 1000); //15min expiration

export const cookies = new Cookies();

export const setLoginCookie = (token: string, isLogged: boolean): void => {
    cookies.set('jwt', token, {
        expires: expirationTime
    });

    cookies.set('isLogged', isLogged, {
        expires: expirationTime
    });
}
  
export const removeLoginCookie = (): void => {
    cookies.remove('jwt');
    cookies.remove('isLogged');
}

export const getToken = (): string => {
    const jwt = cookies.get('jwt');

    return jwt;
}