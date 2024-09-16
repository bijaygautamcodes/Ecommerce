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

export const cartState = atom({
    key: "cartState",
    default: [],
    effects: [localStorageEffect("cart")],
});

export const cartOpenState = atom({
    key: "cartOpenState",
    default: false,
});
