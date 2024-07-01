import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './MainPage.css'; // Import your CSS file
import ProductPreview from './ProductPreview';
import Navbar from '../NavBar/Navbar'; // Import Navbar

const MainPage = () => {
  const [backgroundColor, setBackgroundColor] = useState('#ffffff'); // Initial background color for main page
  const [productBackgroundColor, setProductBackgroundColor] = useState('#f8f9fa'); // Initial background color for products section

  // Example data for carousel slides and product previews
  const carouselSlides = [
    { id: 1, imageUrl: 'https://t3.ftcdn.net/jpg/04/65/46/52/360_F_465465254_1pN9MGrA831idD6zIBL7q8rnZZpUCQTy.jpg' },
    { id: 2, imageUrl: 'https://e0.pxfuel.com/wallpapers/606/84/desktop-wallpaper-ecommerce-website-design-company-noida-e-commerce-banner-design-e-commerce.jpg' },
    { id: 3, imageUrl: 'https://www.zilliondesigns.com/blog/wp-content/uploads/Perfect-Ecommerce-Sales-Banner-1280x720.jpg' },
  ];

  const products = [
    { id: 1, name: 'Product 1', image: 'product1.jpg', price: '99.99' },
    { id: 2, name: 'Product 2', image: 'product2.jpg', price: '88.99' },
    { id: 3, name: 'Product 3', image: 'product3.jpg', price: '77.99' },
    // Add more products as needed
  ];

  // Function to generate a random color
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  useEffect(() => {
    // Change background color every 5 seconds for main page
    const intervalId = setInterval(() => {
      const randomColor = getRandomColor();
      setBackgroundColor(randomColor);
    }, 5000);

    return () => clearInterval(intervalId); // Clean up interval on component unmount
  }, []); // Empty dependency array ensures this effect runs only once

  useEffect(() => {
    // Change background color every 5 seconds for product previews section
    const intervalId = setInterval(() => {
      const randomColor = getRandomColor();
      setProductBackgroundColor(randomColor);
    }, 5000);

    return () => clearInterval(intervalId); // Clean up interval on component unmount
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <>
      <Navbar /> {/* Add Navbar here */}
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
            <h2>Featured Products</h2>
            <div className="row">
              {products.map(product => (
                <div key={product.id} className="col-md-4">
                  <ProductPreview product={product} />
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
