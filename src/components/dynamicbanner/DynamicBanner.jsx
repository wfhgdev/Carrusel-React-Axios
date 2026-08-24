import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Dynamicbanner.css';

const apiUrl = 'https://api.escuelajs.co/api/v1/products';
const maxBannerItems = 3;

const DynamicBanner = () => {
  const [premiumProducts, setPremiumProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

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
        const response = await axios.get(apiUrl);
        const expensiveItems = getTopExpensiveProducts(response.data, maxBannerItems);

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
    return <div className="loadingState">Cargando los productos mas Premium...</div>;
  }

  if (hasError) {
    return <div className="errorState">No fue posible cargar productos Premium en este momento.</div>;
  }

  return (
    <section className="dynamicBannerContainer">
      <h2 className="bannerTitle">Descubre nuestros productos mas "Premium"</h2>
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
                Ver Producto
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default DynamicBanner;