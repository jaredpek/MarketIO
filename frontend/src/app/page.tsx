import Input from "@/components/fields/Input";
import Layout from "@/components/layouts/Layout";
import VerticalSlick from "@/components/navigation/VerticalSlick";
var pixelWidth = require('string-pixel-width');

export default function Page() {
    return (
        <Layout>
            <div className="w-full mt-10">
                <div className="flex items-center justify-center">
                    <span className="mb-3 text-4xl text-center">
                        E-Commerce, <span className="underline">Simplified</span>
                    </span>
                </div>
                <div className="flex gap-1.5 items-center justify-center text-2xl m-auto">
                    <span className="pt-[3px]">Search</span> 
                    <VerticalSlick 
                        items={[
                            "shirts",
                            "electronics",
                            "food",
                            "fitness"
                        ]} 
                    />
                </div>
                <div className="flex items-center justify-center">
                    <Input
                        className="w-full max-w-[600px]"
                        placeholder="Search a product"
                    />
                </div>
            </div>
        </Layout>
    )
}
