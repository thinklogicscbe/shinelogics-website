import React, { useEffect } from 'react';
import { SectionContainer, DivisionContainer } from './style';

const Product: React.FC = () => {
  useEffect(() => {
    // Apply staggered animation delays to each line
    const lines = document.querySelectorAll('.line');
    lines.forEach((line, index) => {
      (line as HTMLElement).style.animationDelay = `${index * 0.2}s`;
    });
  }, []);

  const getAnimatedText = (text: string) => {
    return text.split('. ').map((sentence, index) => (
      <span key={index} className="line">
        {sentence}.
      </span>
    ));
  };

  return (
    <SectionContainer>
      <DivisionContainer>
        {/* Row 1 */}
        <div className="row row-1">
          <div>
            <img src="your-image-url-here.jpg" alt="ERP" />
          </div>
          <div>
            <p>{getAnimatedText("Transform your business with our powerful ERP system! Streamline operations, integrate key functions, and access real-time data insights. Manage inventory, orders, sales, and finances effortlessly.")}</p>
          </div>
        </div>

        {/* Row 2 */}
        <div className="row row-2">
          <div>
            <img src="your-image-url-here.jpg" alt="ERP" />
          </div>
          <div>
            <p>{getAnimatedText("Make informed decisions with detailed analytics and reporting. Improve customer relationships and optimize your supply chain. Easy to use, scalable, and cloud-based for access anytime, anywhere.")}</p>
          </div>
        </div>
      </DivisionContainer>
    </SectionContainer>
  );
};

export default Product;
