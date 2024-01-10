import Title from "@/components/fields/Title";
import Layout from "@/components/layouts/Layout";
import ProfileForm from "@/components/user/profile/ProfileForm";

export default function Page() {
    return (
        <Layout>
            <Title title="Profile" />
            <ProfileForm />
        </Layout>
    )
}