import { useState, useRef } from "react";

const OTPForm = ({ length = 6, onSubmit }) => {
    const [otpValues, setOTPValues] = useState(Array(length).fill(""));
    const inputRefs = Array(length)
        .fill(null)
        .map(() => useRef());

    const handleInputChange = (index, value) => {
        const newValues = [...otpValues];
        newValues[index] = value;

        setOTPValues(newValues);

        if (value && index < length - 1) {
            inputRefs[index + 1].current.focus();
        }
    };

    const handleBackspace = (index, value) => {
        if (!value && index > 0) {
            const newValues = [...otpValues];
            newValues[index - 1] = "";
            setOTPValues(newValues);
            inputRefs[index - 1].current.focus();
        }
    };

    const handlePaste = (e) => {
        const pastedData = e.clipboardData.getData("text/plain");
        const pastedValues = pastedData.slice(0, length).split("");

        const newValues = [...otpValues];
        pastedValues.forEach((value, index) => {
            if (inputRefs[index] && inputRefs[index].current) {
                newValues[index] = value;
            }
        });

        setOTPValues(newValues);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(otpValues.join(""));
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex">
                {otpValues.map((value, index) => (
                    <input
                        key={index}
                        ref={inputRefs[index]}
                        type="text"
                        maxLength={1}
                        value={value}
                        onChange={(e) =>
                            handleInputChange(index, e.target.value)
                        }
                        onKeyDown={(e) => {
                            if (e.key === "Backspace") {
                                handleBackspace(index, value);
                            }
                        }}
                        onPaste={handlePaste}
                        className="border p-2 rounded-md mx-1 w-10 text-center"
                    />
                ))}
            </div>
            <div className="flex justify-center">
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-blue-600"
                >
                    Verify OTP
                </button>
            </div>
        </form>
    );
};

export default OTPForm;
