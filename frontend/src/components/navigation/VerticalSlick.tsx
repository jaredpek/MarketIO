"use client"

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { getKey } from "@/lib/util";
import { useState } from "react";
var pixelWidth = require('string-pixel-width');

function getWidth(item: string, fontSize: number) {
    return pixelWidth(item, {size: fontSize + 2});
}

export default function VerticalSlick({
    items, fontSize, autoplaySpeed
}: {
    items: string[], 
    fontSize: number,
    autoplaySpeed: number
}) {
    const [width, setWidth] = useState(getWidth(items[0], fontSize));
    return (
        <div style={{width, fontSize}}>
            <Slider
                autoplay
                vertical
                infinite
                dots={false}
                autoplaySpeed={autoplaySpeed}
                arrows={false}
                swipe={false}
                pauseOnHover={false}
                beforeChange={(current, next) => {
                    setWidth(getWidth(items[next], fontSize));
                }}
            >
                {
                    items.map(item => {
                        return <div key={getKey()} style={{fontSize}}>{item}</div>
                    })
                }
            </Slider>
        </div>
    )
}
