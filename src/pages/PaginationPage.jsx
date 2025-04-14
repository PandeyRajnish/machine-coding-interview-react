import React, { useEffect, useState } from 'react';
import ProductCard from '../components/pagination/ProductCard';
import { PAGE_SIZE } from '../constants';
import Pagination from '../components/pagination/Pagination';

const PaginationPage = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchData = async () => {
    const response = await fetch('https://dummyjson.com/products?limit=500');
    const data = await response.json();
    setProducts(data.products);
  };

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

      <Pagination
        goToNextPage={goToNextPage}
        goToPrevPage={goToPrevPage}
        handlePageChange={handlePageChange}
        numberOfPages={numberOfPages}
        currentPage={currentPage}
      />
    </div>
  );
};

export default PaginationPage;
