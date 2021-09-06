import React, {useState, useEffect} from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Indicator from './indicator';
import { InView } from 'react-intersection-observer';

const Container = styled.div`
    width: 100vw;
    height: 100%;
    position: relative;
    white-space: nowrap;
    overflow-x: scroll;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
        display: none;
      };
`;

const ImageContainer = styled.div`
    width: 100vw;
    height: 400px;
    position: relative;
    display: inline-block;
    scroll-snap-align: start;
`;

const shimmer = (w, h) => `
    <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
        <linearGradient id="g">
        <stop stop-color="#8c690010" offset="20%" />
        <stop stop-color="#edeef1" offset="50%" />
        <stop stop-color="#f6f7f8" offset="70%" />
        </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="#EEEEEE" />
    <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
    <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
    </svg>
`

const toBase64 = (str) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);

const renderImages = (images,setImageIdx) => {

    return images.map((img,i) => {

            return <>
                <InView as ='div'  onChange = {() => setImageIdx(i)} threshold = {0.6} initialInView ={false}>
                    {({ inView, ref, entry }) => (
                        <ImageContainer ref = {ref} key = {img.id} idx = {i} active = {inView}>
                            <Image
                                placeholder = 'blur'
                                blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                                layout = 'fill'
                                src = {img.src}
                            />
                        </ImageContainer>
                    )}
                </InView>
            </>
        }
    )
}

export default function productImages({images}) {

    const [imageIdx, setImageIdx] = useState(0);

    return (
        <>
            <Container>
                {renderImages(images,setImageIdx)}
            </Container>
            <Indicator quantity = {images.length} idx = {imageIdx} />
        </>
    )
}
