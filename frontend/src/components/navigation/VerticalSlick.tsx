"use client"

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { getKey } from "@/lib/util";
import { useState } from "react";
var pixelWidth = require('string-pixel-width');

export default function VerticalSlick({
    items
}: {
    items: string[]
}) {
    const [width, setWidth] = useState(100);
    return (
        <div style={{width}}>
            <Slider
                autoplay
                vertical
                infinite
                dots={false}
                autoplaySpeed={2000}
                arrows={false}
                swipeToSlide={false}
                pauseOnHover={false}
                afterChange={(current) => {
                    setWidth(Math.ceil(pixelWidth(items[current], {size: 24})))
                }}
            >
                {
                    items.map(item => {
                        return <div key={getKey()} className="underline">{item}</div>
                    })
                }
            </Slider>
        </div>
    )
}
