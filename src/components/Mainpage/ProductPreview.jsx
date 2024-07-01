import React from 'react';

const ProductPreview = ({ product }) => {
  return (
    <div className="product-preview">
      <img src={product.image} alt={product.name} />
      <div className="product-info">
        <h3>{product.name}</h3>
        <p>{product.price}</p>
        {/* Add buttons or links for more details */}
        <button className="btn btn-primary">View Product</button>
      </div>
    </div>
  );
};

export default ProductPreview;
