import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// Constantes de configuración aisladas
const API_URL = 'https://platzi.com';
const MAX_BANNER_ITEMS = 3;

const DynamicBanner = () => {
  const [premiumProducts, setPremiumProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Funciones utilitarias de limpieza y ordenamiento (Clean Code)
  const sortProductsByPriceDescending = (products) => {
    return [...products].sort((firstProduct, secondProduct) => secondProduct.price - firstProduct.price);
  };

  const getTopExpensiveProducts = (products, limit) => {
    const sortedProducts = sortProductsByPriceDescending(products);
    return sortedProducts.slice(0, limit);
  };

  useEffect(() => {
    const fetchBannerProducts = async () => {
      try {
        const response = await axios.get(API_URL);
        const expensiveItems = getTopExpensiveProducts(response.data, MAX_BANNER_ITEMS);

        setPremiumProducts(expensiveItems);
      } catch (error) {
        console.error('Failed to load high value inventory:', error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBannerProducts();
  }, []);

  if (isLoading) {
    return <div className="loadingState">Loading exclusive offers...</div>;
  }

  if (hasError) {
    return <div className="errorState">Unable to load premium products at this time.</div>;
  }

  return (
    <section className="dynamicBannerContainer">
      <h2 className="bannerTitle">Discover Our Premium Line</h2>
      <div className="bannerGrid">
        {premiumProducts.map((product) => (
          <article key={product.id} className="bannerCard">
            <img
              src={product.images[0] || product.images}
              alt={product.title}
              className="bannerImage"
            />
            <div className="bannerInfo">
              <h3 className="productTitle">{product.title}</h3>
              <p className="productPrice">${product.price}</p>
              <Link to={`/product/${product.id}`} className="bannerButton">
                View Product
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default DynamicBanner;