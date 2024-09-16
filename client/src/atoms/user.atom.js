import { atom } from "recoil";

const localStorageEffect =
    (key) =>
    ({ setSelf, onSet }) => {
        const savedValue =
            typeof window !== "undefined" ? localStorage.getItem(key) : null;
        if (savedValue != null) {
            setSelf(JSON.parse(savedValue));
        }

        onSet((newValue, _, isReset) => {
            isReset
                ? typeof window !== "undefined"
                    ? localStorage.removeItem(key)
                    : null
                : typeof window !== "undefined"
                ? localStorage.setItem(key, JSON.stringify(newValue))
                : null;
        });
    };

export const userState = atom({
    key: "userState", // atom identifier
    default: null,
    effects: [localStorageEffect("user")],
});

// signUp form data
export const signUpFormDataState = atom({
    key: "signUpFormDataState", // atom identifier
    default: {
        fullname: "",
        email: "",
        password: "",
    },
});

export const isLoginFormActive = atom({
    key: "isLoginFormActive",
    default: true,
});
