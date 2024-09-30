import React, { useEffect, useRef, useState } from 'react';
import anime from 'animejs/lib/anime.es.js';
import { AnimeInstance } from 'animejs';

const AnimatedDiv = () => {
  
  return (
    <div id='shortItinerary'>
      <svg
        viewBox="0 0 100 200"
        style={{ width: '550px', height: '550px' }}
      >
        <path
          d="M 0 0 V 40 C 60 40 60 120 0 120 C -60 120 -60 200 0 200"
          fill="none"
          stroke="gray"
          strokeWidth="4"
          id='path'
        />

        <g>
          <svg height="20px" width="20px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 46.876 46.876" fill="#000000">
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <g>
                <path d="M26.602,24.568l15.401,6.072l-0.389-4.902c-10.271-7.182-9.066-6.481-14.984-10.615V2.681 c0-1.809-1.604-2.701-3.191-2.681c-1.587-0.021-3.19,0.872-3.19,2.681v12.44c-5.918,4.134-4.714,3.434-14.985,10.615l-0.39,4.903 l15.401-6.072c0,0-0.042,15.343-0.006,15.581l-5.511,3.771v2.957l7.044-2.427h3.271l7.046,2.427V43.92l-5.513-3.771 C26.644,39.909,26.602,24.568,26.602,24.568z"></path>
              </g>
            </g>
          </svg>
        </g>
      </svg>
    </div>
  );
};

export default AnimatedDiv;
