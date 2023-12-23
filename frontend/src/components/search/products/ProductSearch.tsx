"use client"

import { useState } from "react";
import ProductGrid from "./ProductGrid";

export default function ProductSearch({
    className="",
}: {
    className?: string
}) {
    const [items, setItems] = useState(initial);
    return (
        <ProductGrid className={className} items={items} />
    )
}

const initial = [
    {
        "id": "EZBY_11000007308382",
        "title": "Mini SD TF Storage Card 4GB 8GB 16GB 32GB 64GB 128GB Memory Card Auto Data Recorder For MP3/MP4, Phone Camera",
        "url": "https://www.ezbuy.sg/product/11000007308382.html",
        "image": "https://pc-img.elitb.com/products/images/479e6364-c456-4a1e-952a-f5404388ccf3",
        "currency": "S$",
        "price": 6.79,
        "rating": 4,
        "rating_qty": 73,
        "platform": "EzBuy"
    },
    {
        "id": "ALXP_1005006318725624",
        "title": "CRELANDER Intel N95 Notebook 15.6 \" 2K +7\" Touch Screen Quad Core 16GB WIFI Windows11 Portablet PC Computer Dual Screen Laptop",
        "url": "https://www.aliexpress.com/item/1005006318725624.html",
        "image": "https://ae01.alicdn.com/kf/Scb663a7b1ea2492aa30bfef4f39b36b0u/CRELANDER-Intel-N95-Notebook-15-6-2K-7-Touch-Screen-Quad-Core-16GB-WIFI-Windows11-Portablet.jpg_220x220xz.jpg",
        "currency": "S$",
        "price": 475.12,
        "rating": 0,
        "rating_qty": 0,
        "platform": "AliExpress"
    },
    {
        "title": "[New Model] Acer Nitro V 15 ANV15-51-57RN 15.6” FHD IPS Gaming Laptop | RTX 4050 Graphic |13th Gen",
        "url": "https://www.qoo10.sg/item/ACER-NEW-MODEL-ACER-NITRO-V-15-ANV15-51-57RN-15-6-FHD-IPS-GAMING/715194643",
        "id": "QTEN_715194643",
        "image": "https://gd.image-gmkt.com/li/591/360/1950360591.g_100-w-st_g.jpg",
        "currency": "S$",
        "price": 1307.0,
        "rating": 0,
        "rating_qty": 0,
        "platform": "Qoo10"
    },
    {
        "id": "ALXP_1005005407133477",
        "title": "Xiaomi Redmi Book Pro 15 Laptop 2022 i7-12650H/i5-12450H RTX2050/Intel UHD GPU 3.2K 90Hz 15.6 Inch 16GB+512GB Notebook Computer",
        "url": "https://www.aliexpress.com/item/1005005407133477.html",
        "image": "https://ae01.alicdn.com/kf/Sf398f6edc64346cbba0be3e99a91de2cq/Xiaomi-Redmi-Book-Pro-15-Laptop-2022-i7-12650H-i5-12450H-RTX2050-Intel-UHD-GPU-3.jpg_220x220xz.jpg",
        "currency": "S$",
        "price": 1029.38,
        "rating": 0,
        "rating_qty": 0,
        "platform": "AliExpress"
    },
    {
        "title": "[Refurbish] Dell Latitude 7300 Laptop | i7-8th | 16GB RAM | 512GB SSD | Win 11 Pro | 6Mon Warranty",
        "url": "https://www.qoo10.sg/item/REFURBISH-DELL-LATITUDE-7300-LAPTOP-I7-8TH-16GB-RAM-512GB-SSD/739423265",
        "id": "QTEN_739423265",
        "image": "https://gd.image-gmkt.com/li/528/187/1757187528.g_100-w-st_g.jpg",
        "currency": "S$",
        "price": 389.0,
        "rating": 3.0,
        "rating_qty": 3,
        "platform": "Qoo10"
    },
    {
        "title": "[OLED Display] Acer Swift Go 14 | SFG14-71-50EB/55MD 14-Inch WQXGA+ 2.8K(2880x1800) Display Laptop |",
        "url": "https://www.qoo10.sg/item/ACER-OLED-DISPLAY-ACER-SWIFT-GO-14-SFG14-71-50EB-55MD-14-INCH-WQXGA/684895222",
        "id": "QTEN_684895222",
        "image": "https://gd.image-gmkt.com/li/476/704/1752704476.g_100-w-st_g.jpg",
        "currency": "S$",
        "price": 1022.0,
        "rating": 4.0,
        "rating_qty": 6,
        "platform": "Qoo10"
    },
    {
        "id": "ALXP_1005005834963446",
        "title": "WAIWEI 16 Inch 4K Portable Monitor 3840*2400 Gaming Monitor For Xbox PS4 PS5 Switch Mac Laptop PC Phone Display Touch Screen 2K",
        "url": "https://www.aliexpress.com/item/1005005834963446.html",
        "image": "https://ae01.alicdn.com/kf/Sdcad39aa4a9c44a0adb483ac4e3225de1/WAIWEI-16-Inch-4K-Portable-Monitor-3840-2400-Gaming-Monitor-For-Xbox-PS4-PS5-Switch-Mac.jpg_220x220xz.jpg",
        "currency": "S$",
        "price": 195.21,
        "rating": 4.4,
        "rating_qty": 169,
        "platform": "AliExpress"
    },
    {
        "id": "EZBY_11000006946354",
        "title": "Laptop Sleeves 12\" 13\" 14\" inch for slim notebook Shockproof Waterproof, For Macbook Air/Pro, HP, Dell, Lenovo, Asus, Acer, Chromebook Slim Notebook Laptop Carrying Case Cover PU for Office",
        "url": "https://www.ezbuy.sg/product/11000006946354.html",
        "image": "https://pc-img.elitb.com/products/images/33fe1c0a-0f8e-4c02-a33d-a2525794301f",
        "currency": "S$",
        "price": 12.99,
        "rating": 3,
        "rating_qty": 55,
        "platform": "EzBuy"
    },
    {
        "id": "EZBY_11000006817533",
        "title": "Slim Laptop Backpack with USB Charging PortVintage Tear Resistant Business Bag for Travel College School Casual Daypacks for MenWomen Fits up to 15.6Inch Macbook in Grey",
        "url": "https://www.ezbuy.sg/product/11000006817533.html",
        "image": "https://pc-img.elitb.com/products/images/dbae058f-26c9-4f54-b44c-ab5f93065f25",
        "currency": "S$",
        "price": 14.99,
        "rating": 5,
        "rating_qty": 27,
        "platform": "EzBuy"
    },
    {
        "title": "IdeaPad 3 15ALC6 82KU023ESB- AMD Ryzen™ 7 5700U/16GB/512GB SSD/ 15.6 FHD IPS /W11/ 1Year warranty",
        "url": "https://www.qoo10.sg/item/IDEAPAD-3-15ALC6-82KU023ESB-AMD-RYZEN-7-5700U-16GB-512GB-SSD/678210053",
        "id": "QTEN_678210053",
        "image": "https://gd.image-gmkt.com/li/247/918/1759918247.g_100-w-st_g.jpg",
        "currency": "S$",
        "price": 929.0,
        "rating": 5.0,
        "rating_qty": 2,
        "platform": "Qoo10"
    }
]