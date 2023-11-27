'use client'
import React, { useEffect } from 'react'
import Image from 'next/image'
import {
  floating1,
  floating2,
  floating3,
  floating4,
  floating5,
  floating6,
  floating7,
  floating8
} from './images'
import './style.css'

const DepthOfFieldGallery = () => {
  useEffect(() => {
    const photosDom = document.getElementById('photos');
    const images = photosDom.getElementsByTagName('img');
    const len = images.length;
    const deg = Math.floor(360 / len);

    for (let i = 0; i < len; i++) {
      images[i].style = `transform : rotateY(${deg * i}deg) translateZ(380px)`;
    }

    let x = 0;
    const intervalId = setInterval(() => {
      photosDom.style.transform = `rotateX(-10deg) rotateY(${(x++) * 0.2}deg)`;
    }, 30);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="depth-of-field">
      <div id="photos">
        <Image src={floating1} alt='gallaryImage'/>
        <Image src={floating2} alt='gallaryImage'/>
        <Image src={floating3} alt='gallaryImage'/>
        <Image src={floating4} alt='gallaryImage'/>
        <Image src={floating5} alt='gallaryImage'/>
        <Image src={floating6} alt='gallaryImage'/>
        <Image src={floating7} alt='gallaryImage'/>
        <Image src={floating8} alt='gallaryImage'/>
        
      </div>
    </div>
  );
};

export default DepthOfFieldGallery;