import React, { useEffect, useState } from 'react';

const ProductCard = ({ image, title }) => {
  return (
    <div className="product-card">
      <img src={image} alt={title} className="product-img" />
      <span>{title}</span>
    </div>
  );
};

const PAGE_SIZE = 10; // Number of items per page

const Pagination = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchData = async () => {
    const response = await fetch('https://dummyjson.com/products?limit=500');
    const data = await response.json();
    setProducts(data.products);
  };

  console.log(products);

  useEffect(() => {
    fetchData();
  }, []);

  const totalProducts = products.length;
  const numberOfPages = Math.ceil(totalProducts / PAGE_SIZE);
  const start = currentPage * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  const handlePageChange = (n) => {
    setCurrentPage(n);
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const goToPrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return !products.length ? (
    <h1 className="font-bold flex justify-center items-center h-[100vh]">
      No Products Found
    </h1>
  ) : (
    <div className="App">
      <h1>Pagination</h1>

      <div className="products-container">
        {products.slice(start, end).map((product) => (
          <ProductCard
            key={product.id}
            image={product.thumbnail}
            title={product.title}
          />
        ))}
      </div>
      <div className="pagination-conatainer">
        <button
          disabled={currentPage === 0}
          className="page-number"
          onClick={() => goToPrevPage()}
        >
          ◀
        </button>
        {[...Array(numberOfPages).keys()].map((n) => (
          <button
            className={`page-number ${n === currentPage ? 'active' : ''}`}
            key={n}
            onClick={() => handlePageChange(n)}
          >
            {n}
          </button>
        ))}
        <button
          disabled={currentPage === numberOfPages - 1}
          className="page-number"
          onClick={() => goToNextPage()}
        >
          ▶
        </button>
      </div>
    </div>
  );
};

export default Pagination;
