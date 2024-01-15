import Title from "@/components/fields/Title";
import Layout from "@/components/layouts/Layout";
import ProfileContent from "@/components/user/profile/ProfileContent";

export default function Page() {
    return (
        <Layout>
            <Title title="Profile" />
            <ProfileContent />
        </Layout>
    )
}