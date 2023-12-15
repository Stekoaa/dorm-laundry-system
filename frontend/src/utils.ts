export const USERNAME_REGEX = /^[a-zA-Z0-9_-]{3,20}$/;
export const FIRST_NAME_REGEX = /^[\p{L}'-]+$/u
export const SURNAME_REGEX = /^[\p{L}'\s-]+$/u;
export const EMAIL_REGEX = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
export const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&+=])(?=\S+$).{8,32}$/;