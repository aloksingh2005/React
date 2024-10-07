import Cookies from 'js-cookie';
import { decryptData, encryptData } from './cryptoUtils';

const TOKEN_COOKIE_NAME = 'authToken';
const USER_COOKIE_NAME = 'userData';

// Encrypt and store token and user data
export const storeTokenAndUserData = (tokenData, userData) => {
    try {
        const { encryptedData: encryptedToken, iv: tokenIv } = encryptData(tokenData);
        const { encryptedData: encryptedUser, iv: userIv } = encryptData(userData);

        // Store both encrypted data and IV in cookies
        Cookies.set(TOKEN_COOKIE_NAME, JSON.stringify({ encryptedToken, tokenIv }), {
            secure: true,
            sameSite: 'Strict',
        });

        Cookies.set(USER_COOKIE_NAME, JSON.stringify({ encryptedUser, userIv }), {
            secure: true,
            sameSite: 'Strict',
        });
    } catch (error) {
        console.error('Error storing token or user data:', error);
    }
};

// Retrieve and decrypt token and user data
export const retrieveTokenAndUserData = (encrypted = false) => {
    const tokenCookie = Cookies.get(TOKEN_COOKIE_NAME);
    const userCookie = Cookies.get(USER_COOKIE_NAME);

    if (tokenCookie && userCookie) {
        try {

            if (encrypted === true) {

                const token = JSON.parse(tokenCookie);
                const user = JSON.parse(userCookie);

                return { token: token, user: user };

            } else {

                const { encryptedToken, tokenIv } = JSON.parse(tokenCookie);
                const { encryptedUser, userIv } = JSON.parse(userCookie);

                const decryptedToken = decryptData(encryptedToken, tokenIv);
                const decryptedUser = decryptData(encryptedUser, userIv);

                return { token: decryptedToken, user: decryptedUser };

            }


        } catch (error) {
            console.error('Error decrypting token or user data:', error);
            return { token: null, user: null };
        }
    }
    return { token: null, user: null };
};

// Remove token and user data
export const clearTokenAndUserData = () => {
    Cookies.remove(TOKEN_COOKIE_NAME, { secure: true, sameSite: 'Strict' });
    Cookies.remove(USER_COOKIE_NAME, { secure: true, sameSite: 'Strict' });
};
