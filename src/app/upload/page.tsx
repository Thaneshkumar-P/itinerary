// 'use client'

// import React, { useEffect, useRef, useState } from 'react';
// import anime from 'animejs';

// const ZigZagScrollAnimation: React.FC = () => {
//   const svgRef = useRef<SVGSVGElement | null>(null);
//   const svgObjectRef = useRef<SVGCircleElement | null>(null);
//   const [pathLength, setPathLength] = useState<number>(0);

//   useEffect(() => {
//     const path = svgRef.current?.querySelector('path');
//     if (!path) return;

//     // Get the total length of the path
//     const totalPathLength = path.getTotalLength();
//     setPathLength(totalPathLength);

//     const handleScroll = () => {
//       const scrollPercentage = window.scrollY / (document.body.scrollHeight - window.innerHeight);
//       const drawLength = totalPathLength * scrollPercentage;

//       // Get the point along the path at the current scroll position
//       const pointAtLength = path.getPointAtLength(drawLength);

//       // Move the circle to this point
//       anime({
//         targets: svgObjectRef.current,
//         translateX: pointAtLength.x,
//         translateY: pointAtLength.y,
//         easing: 'linear',
//         duration: 0, // Real-time updates
//       });
//     };

//     // Attach the scroll event listener
//     window.addEventListener('scroll', handleScroll);

//     // Cleanup on unmount
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, [pathLength]);

//   return (
//     <div style={{ height: '200vh' }}>
//       <svg
//         ref={svgRef}
//         viewBox="0 0 100 200"
//         style={{ width: '400px', height: '400px' }}
//       >
        
//         <path
//           d="M 0 0 V 40 C 60 40 60 120 0 120 C -60 120 -60 200 0 200"
//           fill="none"
//           stroke="gray"
//           strokeWidth="4"
//         />
        
//         <circle ref={svgObjectRef} cx="0" cy="0" r="6" fill="blue" /> {/* Larger radius */}
//       </svg>
//     </div>
//   );
// };

// export default ZigZagScrollAnimation;
'use client';

import React, { useEffect, useState } from 'react';
import anime from 'animejs/lib/anime.es.js';

const AnimatedDiv = () => {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | 'idle'>('idle');
  let lastScrollY = 0;
  let scrollTimeout: NodeJS.Timeout | null = null;

  useEffect(() => {
    // Initialize the main path animation (fade in and translate)
    const animation = anime({
      targets: '#path-main',
      translateY: [100, 0],
      opacity: [0, 1],
      autoplay: false,
      easing: 'easeInOutSine',
      duration: 1000,
    });

    // Select the path element
    const pathElement = document.querySelector('#path') as SVGPathElement;
    const circleElement = document.querySelector('#circle') as SVGCircleElement;

    // Get the total length of the path
    const pathLength = pathElement.getTotalLength();

    // Set the circle position at the start of the path
    circleElement.setAttribute('cx', `${pathElement.getPointAtLength(0).x}`);
    circleElement.setAttribute('cy', `${pathElement.getPointAtLength(0).y}`);

    // Animation state variables
    let tracingProgress = 0; // 0 to 1 (percentage of path traversal)

    // Update circle position along the path based on the progress (0 to 1)
    const updateCirclePosition = (progress: number) => {
      const point = pathElement.getPointAtLength(progress * pathLength);
      circleElement.setAttribute('cx', `${point.x}`);
      circleElement.setAttribute('cy', `${point.y}`);
    };

    // Scroll event handler to control the path tracing
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        // Scrolling down
        tracingProgress += 0.01; // Adjust speed of progress based on scroll
        if (tracingProgress > 1) tracingProgress = 1;
        setScrollDirection('down');
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up
        tracingProgress -= 0.01;
        if (tracingProgress < 0) tracingProgress = 0;
        setScrollDirection('up');
      }

      // Update circle position based on scroll
      updateCirclePosition(tracingProgress);

      lastScrollY = currentScrollY;

      if(tracingProgress === 1)
        window.removeEventListener('scroll', handleScroll);

      // Idle detection after scroll stops
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setScrollDirection('idle');
      }, 300); // Idle timeout (300ms after no scroll)
    };

    // Intersection observer to start animation when in view
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animation.play();
          if(rootDiv)
            observer.unobserve(rootDiv)

          window.addEventListener('scroll', handleScroll);
        }
      });
    };

    const rootDiv = document.getElementById('shortItinerary');
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: .1,
    });

    if (rootDiv) observer.observe(rootDiv);

    // Cleanup event listeners and observers on component unmount
    return () => {
      if (rootDiv) observer.unobserve(rootDiv);
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, []);

  useEffect(() => {
    const locations = document.querySelectorAll('.shortItinerary-locations');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;

          // Animate the currently intersecting location
          anime({
            targets: target,
            opacity: [0, 1],
            easing: 'easeInOutSine',
            duration: 1000,
          });

          anime({
            targets: target.querySelector('#shortItinerary-locations-line'), // Animate the line specific to this location
            scaleX: [0, 1],
            opacity: [0, 1],
            easing: 'easeInOutSine',
            duration: 1000,
          });

          observer.unobserve(target); // Stop observing after it has been animated
        }
      });
    }, { threshold: 1 });

    locations.forEach(location => {
      observer.observe(location);
    });

    return () => {
      locations.forEach(location => {
        observer.unobserve(location);
      });
    };
  }, []);


  return (
    <>
      <div className="h-[100vh]"></div>
      <div className="h-[100vh] flex justify-center">
        <div>
          <div className='shortItinerary-locations flex flex-row-reverse justify-center items-center left-[8px] relative top-[160px]' style={{ opacity: 0 }}>
            <div id="shortItinerary-locations-line" className="relative flex flex-row w-[96px] h-[1px] justify-end info info-large info-left info-bottom" data-delay="1000">
              <div className="w-[96px] h-full bg-black info-bar" style={{ transformOrigin: '100% -50%' }}></div> {/* Changed to start from right */}
            </div>
            <div className="p-5 border border-black rounded-xl shadow-xl">
              <figcaption className="feature-caption">reverse</figcaption>
              <figcaption className="feature-caption">loop 3 begin</figcaption>
            </div>
          </div>
          <div className='shortItinerary-locations flex flex-row-reverse justify-center items-center left-[8px] relative top-[280px]' style={{ opacity: 0 }}>
            <div id="shortItinerary-locations-line" className="relative flex flex-row w-[96px] h-[1px] justify-end info info-large info-left info-bottom" data-delay="1000">
              <div className="w-[96px] h-full bg-black info-bar" style={{ transformOrigin: '50% 100%'}}></div>
            </div>
            <div className="p-5 border border-black rounded-xl shadow-xl">
              <figcaption className="feature-caption">reverse</figcaption>
              <figcaption className="feature-caption">loop 3 begin</figcaption>
            </div>
          </div>
        </div>
        <div>
          <div id="shortItinerary">
            <svg
              viewBox='0 0 10 500'
              style={{ width: '150px', height: '650px' }}
              id="path-main"
            >

              <path
                d="M 0 0 V 40 C 60 40 60 120 0 120 C -60 120 -60 200 0 200 C 60 200 60 280 0 280 C -60 280 -60 360 0 360 C 60 360 60 440 0 440 V 440 480" // Extended path with more curves
                fill="none"
                stroke="gray"
                strokeWidth="4"
                id="path"
              />

              <circle cx="0" cy="0" r="6" fill="black" id="circle" />

            </svg>
          </div>
        </div>
        <div className=''>
          <div className='shortItinerary-locations flex flex-row justify-center items-center -left-[21px] relative top-[60px]' style={{ opacity: 0 }}>
            <div id="shortItinerary-locations-line" className="relative flex flex-row w-[96px] h-[1px] justify-end info info-large info-left info-bottom" data-delay="1000">
              <div className="w-[96px] h-full bg-black info-bar" style={{ transformOrigin: '50% 100%'}}></div>
            </div>
            <div className="p-5 border border-black rounded-xl shadow-xl">
              <figcaption className="feature-caption">reverse</figcaption>
              <figcaption className="feature-caption">loop 3 begin</figcaption>
            </div>
          </div>
          <div className='shortItinerary-locations flex flex-row justify-center items-center -left-[21px] relative top-[180px]' style={{ opacity: 0 }}>
            <div id="shortItinerary-locations-line" className="relative flex flex-row w-[96px] h-[1px] justify-end info info-large info-left info-bottom" data-delay="1000">
              <div className="w-[96px] h-full bg-black info-bar " style={{ transformOrigin: '50% 100%'}}></div>
            </div>
            <div className="p-5 border border-black rounded-xl shadow-xl">
              <figcaption className="feature-caption">reverse</figcaption>
              <figcaption className="feature-caption">loop 3 begin</figcaption>
            </div>
          </div>

          
        </div>
      </div>
      <div className="p-5">
        <p>Current Scroll State: {scrollDirection}</p>
      </div>
    </>
  );
};

export default AnimatedDiv;
