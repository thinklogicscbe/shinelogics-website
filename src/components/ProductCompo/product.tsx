// import {SectionContainer,DivisionContainer} from './style';

// const Product = () => {
//   return (
//     <SectionContainer>
//         <DivisionContainer>
//         <div>
//           <p>Image</p>
//         </div>
//         <div>
//         <p>Transform your business with our powerful ERP system! Streamline operations, integrate key functions, and access real-time data insights. Manage inventory, orders, sales, and finances effortlessly. With multi-warehouse support and customizable features, our ERP adapts to your business needs. Make informed decisions with detailed analytics and reporting. Improve customer relationships and optimize your supply chain. Easy to use, scalable, and cloud-based for access anytime, anywhere. Automate processes, boost efficiency, and drive growth. Request a demo today and experience the future of business management!</p>
//         </div>
//         </DivisionContainer>

//     </SectionContainer>
//   );
// };

// export default Product;

import React from 'react';
import { SectionContainer, DivisionContainer } from './style';

const Product: React.FC = () => {
  return (
    <SectionContainer>
      <DivisionContainer>
        {/* Row 1 */}
        <div className="row row-1">
          <div>
            <img src="your-image-url-here.jpg" alt="ERP" />
          </div>
          <div>
            <p>
              Transform your business with our powerful ERP system! Streamline operations, integrate key functions, and access real-time data insights. Manage inventory, orders, sales, and finances effortlessly. With multi-warehouse support and customizable features, our ERP adapts to your business needs.
            </p>
          </div>
        </div>

        {/* Row 2 */}
        <div className="row row-2">
          <div>
            <img src="your-image-url-here.jpg" alt="ERP" />
          </div>
          <div>
            <p>
              Make informed decisions with detailed analytics and reporting. Improve customer relationships and optimize your supply chain. Easy to use, scalable, and cloud-based for access anytime, anywhere.
            </p>
          </div>
        </div>

        {/* Row 3 */}
        <div className="row row-3">
          <div>
            <img src="your-image-url-here.jpg" alt="ERP" />
          </div>
          <div>
            <p>
              Automate processes, boost efficiency, and drive growth. Request a demo today and experience the future of business management!
            </p>
          </div>
        </div>
      </DivisionContainer>
    </SectionContainer>
  );
};

export default Product;
