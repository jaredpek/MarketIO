import Layout from "@/components/layouts/Layout";
import ProfileForm from "@/components/user/profile/ProfileForm";

export default function Page() {
    return (
        <Layout>
            <ProfileForm backendUrl={process.env.NEXTAUTH_BACKEND_URL} />
        </Layout>
    )
}