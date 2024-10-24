// src/redux/userActions.jsx
import { SIGN_OUT } from './userTypes'; // Assuming you have a separate file for action types

export const signOut = () => {
    return {
        type: SIGN_OUT,
    };
};
