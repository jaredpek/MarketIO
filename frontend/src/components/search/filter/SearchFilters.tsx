import { useEffect, useState } from 'react';
import { sortOptions } from './SortFilter';
import SortFilter from './SortFilter';
import PriceFilter from './PriceFilter';
import PlatformFilter, { scraperOptions } from './ScraperFilter';
import { Option } from '@/components/fields/Selector';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SearchFilters({
    loading, className=""
}: {
    loading: boolean,
    className?: string
}) {
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [sort, setSort] = useState <Option> (sortOptions[0]);
    const [scrapers, setScrapers] = useState <Option[]> ([]);
    const router = useRouter();
    const params = useSearchParams();

    function getSortOption() {
        for (let i = 0; i < sortOptions.length; i ++) {
            if (sortOptions[i].value === params.get("sort")) return sortOptions[i];
        }
        return sortOptions[0];
    }

    function getScraperOptions() {
        const param = params.get("scrapers");
        if (!param) return [];
        let result = [];
        for (let i = 0; i < scraperOptions.length; i ++) {
            if (param.includes(scraperOptions[i].value)) result.push(scraperOptions[i]);
        }
        return result;
    }

    useEffect(() => {
        setMinPrice(params.get("minPrice") || "");
        setMaxPrice(params.get("maxPrice") || "");
        setSort(getSortOption());
        setScrapers(getScraperOptions());
    }, [params])

    function applyFilters() {
        if (loading) return;
        const search = `search=${params.get("search")}&`;
        const minPriceStr = minPrice ? `minPrice=${minPrice}&` : "";
        const maxPriceStr = maxPrice ? `maxPrice=${maxPrice}&` : "";
        const sortStr = (sort.value != "relevance") ? `sort=${sort.value}&` : "";

        const scraperSelected = () => {
            let result = "";
            scrapers.forEach(scraper => {
                result += `${scraper.value},`;
            });
            return result.slice(0, -1);
        }
        const scraperStr = (scrapers.length) ? `scrapers=${scraperSelected()}&` : "";
        router.push(`/search?${search}${minPriceStr}${maxPriceStr}${sortStr}${scraperStr}`.slice(0, -1));
    }

    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            <div className="flex max-[560px]:flex-wrap max-[560px]:gap-2 gap-6">
                <SortFilter
                    value={sort}
                    onChange={data => setSort(data)}
                />
                <PriceFilter
                    minPriceValue={minPrice}
                    maxPriceValue={maxPrice}
                    minPriceChange={e => setMinPrice(e.target.value)}
                    maxPriceChange={e => setMaxPrice(e.target.value)}
                />
            </div>
            <div className='flex flex-col md:flex-row gap-2'>
                <PlatformFilter
                    value={scrapers}
                    onChange={data => setScrapers(data)}
                />
                <div className={`rounded button submit px-4 md:w-[80px] ${loading ? "!cursor-not-allowed !bg-blue-400" : ""}`} title='Apply Filters' onClick={applyFilters}>Apply</div>
            </div>
        </div>
    )
}