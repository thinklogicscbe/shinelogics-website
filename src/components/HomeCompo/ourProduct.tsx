import { BannerImage, TechnologiesHeading, TechnologiesParagraph } from './style';

const OurProduct = () => {

    return (
        <div>
            {/* <ProductContainer>
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
            </ProductContainer> */}

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
