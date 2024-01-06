import Layout from "@/components/layouts/Layout";
import AuthLayout from "@/components/user/AuthLayout";
import CredentialRegister from "@/components/user/CredentialRegister";

export default function Page() {
    return (
        <Layout>
            <AuthLayout>
                <CredentialRegister />
            </AuthLayout>
        </Layout>
    )
}