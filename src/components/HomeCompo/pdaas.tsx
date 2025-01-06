// import React from 'react';
// import pdaasimg from '../../assets/home-image/pdaas.webp';
// import { PdaasContainer, PdaasImage, PdaasContent } from './style';

// const Pdaas = () => {
//     return (
//         <PdaasContainer>
//             <PdaasImage src={pdaasimg} alt="PDaaS Image" />
//             <PdaasContent>
//                 <h1>Our Process</h1>
//                 Product Development as a Service (PDaaS) is an outsourcing model that helps companies develop
//                 products through third-party expertise. This model covers the entire product development lifecycle,
//                 from design to deployment. Shinelogics aims to provide top-quality products using the PDaaS model.
//                 Discover our range of products designed to streamline business operations, enhance productivity, and
//                 provide exceptional service to our clients.
//             </PdaasContent>
//         </PdaasContainer>
//     );
// };

// export default Pdaas;

import React, { useState, useEffect, useRef } from 'react';
import pdaasimg from '../../assets/home-image/pdaas.webp';
import { PdaasContainer, AnimatedImage, PdaasContent } from './style';

const Pdaas = () => {
    const [isVisible, setIsVisible] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        observer.disconnect(); // Stop observing once visible
                    }
                });
            },
            { threshold: 0.1 } // Trigger when 10% of the element is visible
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <PdaasContainer ref={containerRef}>
            <AnimatedImage 
                src={pdaasimg} 
                alt="PDaaS Image" 
                className={isVisible ? 'animate' : ''} 
            />
            <PdaasContent>
                <h1>Our Process</h1>
                Product Development as a Service (PDaaS) is an outsourcing model that helps companies develop
                products through third-party expertise. This model covers the entire product development lifecycle,
                from design to deployment. Shinelogics aims to provide top-quality products using the PDaaS model.
                Discover our range of products designed to streamline business operations, enhance productivity, and
                provide exceptional service to our clients.
            </PdaasContent>
        </PdaasContainer>
    );
};

export default Pdaas;

