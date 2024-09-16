import { useEffect } from "react";
import { verifyFullnameAndEmail } from "@/services/user.service";
import { useRecoilState } from "recoil";
import { signUpFormDataState } from "@/atoms/user.atom";

export default function FullnameAndEmailVerification({
    setFullnameAndEmailErrors,
    highlights,
}) {
    const { fullname, email } = highlights;
    const [formData, setFormData] = useRecoilState(signUpFormDataState);

    useEffect(() => {
        const debounceTimeout = setTimeout(async () => {
            const fields = await verifyFullnameAndEmail(
                formData.fullname,
                formData.email
            );
            setFullnameAndEmailErrors(fields);
        }, 500);
        return () => clearTimeout(debounceTimeout);
    }, [formData.fullname, formData.email]);

    const handleFullnameChange = (event) => {
        setFormData({ ...formData, fullname: event.target.value });
    };
    const handleEmailChange = (event) => {
        setFormData({ ...formData, email: event.target.value });
    };

    return (
        <div>
            <div className="mb-4">
                <label htmlFor="username" />
                <input
                    className={`block w-full p-4 pl-6 pr-6  rounded-xl text-[#111] placeholder:text-[#111] truncate ${
                        fullname
                            ? "bg-red-100 focus:outline-red-500"
                            : "bg-[#eee]"
                    }`}
                    placeholder="Full Name"
                    id="fullname"
                    type="text"
                    autoComplete="name"
                    onChange={handleFullnameChange}
                />
            </div>
            <div className="mb-4">
                <label htmlFor="email" />
                <input
                    className={`block w-full p-4 pl-6 pr-6  rounded-xl text-[#111] placeholder:text-[#111] truncate ${
                        email ? "bg-red-100 focus:outline-red-500" : "bg-[#eee]"
                    }`}
                    placeholder="Email"
                    id="email"
                    type="text"
                    autoComplete="email"
                    onChange={handleEmailChange}
                />
            </div>
        </div>
    );
}
