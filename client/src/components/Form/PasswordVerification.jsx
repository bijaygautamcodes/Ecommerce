import { useEffect } from "react";
import { verifyPassword } from "@/services/user.service";
import { useRecoilState } from "recoil";
import { signUpFormDataState } from "@/atoms/user.atom";

export default function PasswordVerification({
    showPass,
    setPassErrors,
    highlight,
}) {
    const [fromData, setFormData] = useRecoilState(signUpFormDataState);

    useEffect(() => {
        const debounceTimeout = setTimeout(async () => {
            const fields = await verifyPassword(fromData.password);
            setPassErrors(fields);
        }, 500);

        return () => clearTimeout(debounceTimeout);
    }, [fromData.password]);

    const handlePasswordChange = (event) => {
        setFormData({ ...fromData, password: event.target.value });
    };

    return (
        <div>
            <input
                className={`block w-full p-4 pl-6 pr-6  rounded-xl text-[#111] placeholder:text-[#111] truncate ${
                    highlight ? "bg-red-100 focus:outline-red-500" : "bg-[#eee]"
                }`}
                placeholder="Password"
                type={showPass ? "text" : "password"}
                autoComplete="current-password"
                onChange={handlePasswordChange}
            />
        </div>
    );
}
