import React, { useEffect, useRef } from 'react';
import { ProductContainer, ProductCard, ProductTitle, Video } from './style';
import EMS from '../../assets/video/EMS.mp4';
import eOpSys from '../../assets/video/eOpSys.mp4';
import E_commerce from '../../assets/video/E-commerce.mp4';

const OurProduct = () => {
    const eOpSysRef = useRef<HTMLVideoElement>(null);
    const eComRef = useRef<HTMLVideoElement>(null);
    const emsRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (eOpSysRef.current) eOpSysRef.current.play();
        if (eComRef.current) eComRef.current.play();
        if (emsRef.current) emsRef.current.play();
    }, []);

    return (
        <ProductContainer>
            <ProductTitle>Products Overview</ProductTitle>
            <p>Discover our range of products designed to streamline business operations, enhance productivity, and provide exceptional service to our clients.</p>
            <div className="services-grid">
                <ProductCard>
                    <h5>eOpSys Enterpreneur Operating System</h5>
                    <Video ref={eOpSysRef} src={eOpSys} autoPlay loop muted controls={false} />
                </ProductCard>

                <ProductCard>
                    <h5>E-commerce Platform</h5>
                    <Video ref={eComRef} src={E_commerce} autoPlay loop muted controls={false} />
                </ProductCard>

                <ProductCard>
                    <h5>EMS (Employee Management System)</h5>
                    <Video ref={emsRef} src={EMS} autoPlay loop muted controls={false} />
                </ProductCard>
            </div>
        </ProductContainer>
    );
}

export default OurProduct;
