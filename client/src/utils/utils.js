export const validateFullName = (nameErrors) =>
    nameErrors.every((error) => !error.status);

export const validateEmail = (emailErrors) =>
    emailErrors.every((error) => !error.status);

export const validatePassword = (passErrors) =>
    passErrors.every((error) => !error.status);

export function getTokenFromStorage() {
    if (typeof window === "undefined") return null;
    const user = localStorage.getItem("user");
    if (user) {
        return JSON.parse(user).token;
    }
    return null;
}

export const validateForm = (
    passErrors,
    fullNameAndEmailErrors,
    state,
    setState
) => {
    const { nameErrors, emailErrors } = fullNameAndEmailErrors;
    const isFullnameValid = validateFullName(nameErrors);
    const isEmailValid = validateEmail(emailErrors);
    const isPasswordValid = validatePassword(passErrors);
    setState({
        ...state,
        highlight: {
            fullname: !isFullnameValid,
            email: !isEmailValid,
            password: !isPasswordValid,
        },
    });

    return isFullnameValid && isEmailValid && isPasswordValid;
};
