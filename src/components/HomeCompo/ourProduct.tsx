import React, { useEffect, useRef } from 'react';
import { ProductContainer, ProductCard, ProductTitle, Video, BannerImage, TechnologiesHeading, TechnologiesParagraph } from './style';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import EMS from '../../assets/video/EMSvideo.mp4';
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
        <div>
            <ProductContainer>
                <ProductTitle>Products Overview</ProductTitle>
                <p>Discover our range of products designed to streamline business operations, enhance productivity, and provide exceptional service to our clients.</p>
                <div className="services-grid">
                    <ProductCard>
                        <Link to="/ProductCompo/erp">
                            <h5>eOpSys Enterpreneur Operating System</h5>
                            <Video className='v1' ref={eOpSysRef} src={eOpSys} autoPlay loop muted controls={false} />
                        </Link>
                    </ProductCard>

                    <ProductCard>
                        <Link to="/ProductCompo/e-commerce">
                            <h5>E-commerce Platform</h5>
                            <Video ref={eComRef} src={E_commerce} autoPlay loop muted controls={false} />
                        </Link>
                    </ProductCard>

                    <ProductCard>
                        <Link to="/ProductCompo/ems">
                            <h5>EMS (Employee Management System)</h5>
                            <Video ref={emsRef} src={EMS} autoPlay loop muted controls={false} />
                        </Link>
                    </ProductCard>
                </div>
            </ProductContainer>

            <div>
                <TechnologiesHeading>Technologies</TechnologiesHeading>
                <TechnologiesParagraph>
                    We are using cutting-edge technologies to build scalable and efficient systems for our clients.
                    Our tech stack includes:
                </TechnologiesParagraph>
                <BannerImage />
            </div>
        </div>
    );
}

export default OurProduct;
