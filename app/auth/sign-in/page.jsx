import { getProviders } from "next-auth/react";
import SignIn from "@/components/shared/SignIn";

const page = async () => {
    const providers= await getProviders();

    return providers && <SignIn providers={providers} />
};

export default page;
