import { useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";
import { userState } from "@/atoms/user.atom";
import { useEffect } from "react";

const useAdmin = () => {
    const router = useRouter();
    const user = useRecoilValue(userState);
    useEffect(() => {
        if (!user) return router.replace("/auth");
        else if (!user?.isAdmin) return router.replace("/");
        else return;
    }, [user]);
};

export default useAdmin;
