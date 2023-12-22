import Layout from "@/components/layouts/Layout";
import SearchBar from "@/components/navigation/SearchBar";
import VerticalSlick from "@/components/navigation/VerticalSlick";

export default function Page() {
    return (
        <Layout>
            <div className="w-full mt-10">
                <div className="flex items-center justify-center mb-8">
                    <span className="text-4xl sm:text-5xl text-center">
                        E-Commerce, <span className="underline">Simplified</span>
                    </span>
                </div>
                <div className="flex gap-1.5 items-center justify-center m-auto mb-8">
                    <div className="flex gap-1.5 pt-[0.55px]" style={{fontSize: 24}}>
                        Search <span className="hidden min-[400px]:block">Anything:</span>
                    </div>
                    <VerticalSlick 
                        items={[
                            "Electronics",
                            "Fitness",
                            "Food",
                            "Games",
                            "Shirts",
                        ]} 
                        fontSize={24}
                        autoplaySpeed={2000}
                    />
                </div>
                <SearchBar className="mx-auto" />
            </div>
        </Layout>
    )
}
