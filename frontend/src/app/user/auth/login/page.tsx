import Layout from "@/components/layouts/Layout";
import AuthLayout from "@/components/user/AuthLayout";
import CredentialLogin from "@/components/user/CredentialLogin";

export default function Page() {
    return (
        <Layout>
            <AuthLayout>
                <CredentialLogin />
            </AuthLayout>
        </Layout>
    )
}