import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './MainPage.css';
import ProductPreview from './ProductPreview';
import Navbar from '../NavBar/Navbar';

const MainPage = () => {
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [productBackgroundColor, setProductBackgroundColor] = useState('#f8f9fa');

  const carouselSlides = [
    { id: 1, imageUrl: 'https://t3.ftcdn.net/jpg/04/65/46/52/360_F_465465254_1pN9MGrA831idD6zIBL7q8rnZZpUCQTy.jpg' },
    { id: 2, imageUrl: 'https://e0.pxfuel.com/wallpapers/606/84/desktop-wallpaper-ecommerce-website-design-company-noida-e-commerce-banner-design-e-commerce.jpg' },
    { id: 3, imageUrl: 'https://www.zilliondesigns.com/blog/wp-content/uploads/Perfect-Ecommerce-Sales-Banner-1280x720.jpg' },
  ];

  const products = [
    { id: 1, name: 'Product 1', image: 'https://via.placeholder.com/300x200', price: '99.99' },
    { id: 2, name: 'Product 2', image: 'https://via.placeholder.com/300x200', price: '88.99' },
    { id: 3, name: 'Product 3', image: 'https://via.placeholder.com/300x200', price: '77.99' },
  ];

  const getRandomColor = () => {
    return '#' + Math.floor(Math.random()*16777215).toString(16);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setBackgroundColor(getRandomColor());
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setProductBackgroundColor(getRandomColor());
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <Navbar />
      <main className="main-page" style={{ backgroundColor }}>
        <section className="carousel-section">
          <Carousel showArrows autoPlay interval={5000} infiniteLoop>
            {carouselSlides.map(slide => (
              <div key={slide.id} className="carousel-slide">
                <img src={slide.imageUrl} alt={`Slide ${slide.id}`} />
              </div>
            ))}
          </Carousel>
        </section>

        <section className="product-previews" style={{ backgroundColor: productBackgroundColor }}>
          <div className="container">
            <h2 className="text-center my-5">Featured Products</h2>
            <div className="row">
              {products.map(product => (
                <div key={product.id} className="col-md-4 mb-4">
                  <div className="product-card" onClick={() => alert(`You clicked on ${product.name}`)}>
                    <img src={product.image} alt={product.name} className="product-image" />
                    <div className="product-info">
                      <h3>{product.name}</h3>
                      <p>${product.price}</p>
                      <button className="btn btn-primary">View Details</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default MainPage;