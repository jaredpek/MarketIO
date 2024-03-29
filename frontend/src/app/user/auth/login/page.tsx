import Layout from "@/components/layouts/Layout";
import AuthLayout from "@/components/layouts/AuthLayout";
import CredentialLogin from "@/components/user/auth/CredentialLogin";

export default function Page() {
    return (
        <Layout>
            <AuthLayout>
                <CredentialLogin />
            </AuthLayout>
        </Layout>
    )
}