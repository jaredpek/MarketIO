import Layout from "@/components/layouts/Layout";
import AuthLayout from "@/components/layouts/AuthLayout";
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