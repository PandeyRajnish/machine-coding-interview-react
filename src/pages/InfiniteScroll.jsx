// import { useEffect, useState, useCallback, useRef } from 'react';

// const InfiniteScroll = () => {
//   const [products, setProducts] = useState([]);
//   const [isFetching, setIsFetching] = useState(false);
//   const [skip, setSkip] = useState(0);
//   const [hasMore, setHasMore] = useState(true);
//   const limit = 1; // Increased for better performance

//   // Use ref to track fetching state
//   const isFetchingRef = useRef(isFetching);
//   isFetchingRef.current = isFetching;

//   const fetchProducts = useCallback(async () => {
//     if (isFetchingRef.current || !hasMore) return;
    
//     setIsFetching(true);
    
//     try {
//       const res = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
//       if (!res.ok) throw new Error('Network response was not ok');
      
//       const data = await res.json();
      
//       if (data.products.length === 0) {
//         setHasMore(false);
//         return;
//       }
      
//       setProducts(prev => [...prev, ...data.products]);
//       setSkip(prev => prev + data.products.length);
//     } catch (err) {
//       console.error('Error fetching products:', err);
//     } finally {
//       setIsFetching(false);
//     }
//   }, [skip, limit, hasMore]);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (
//         window.innerHeight + window.scrollY >= 
//         document.documentElement.offsetHeight - 100 && 
//         !isFetchingRef.current && 
//         hasMore
//       ) {
//         fetchProducts();
//       }
//     };

//     // Initial load
//     fetchProducts();
    
//     // Add scroll event listener with debounce
//     window.addEventListener('scroll', handleScroll);
    
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, [fetchProducts]); // Only depend on fetchProducts

//   return (
//     <div style={{ padding: '1rem', minHeight: '101vh' }}>
//       <h1>🛍 Dummy Products</h1>
//       <div style={{ 
//         display: 'grid', 
//         gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
//         gap: '1rem',
//         marginBottom: '1rem'
//       }}>
//         {products.map(product => (
//           <div key={product.id} style={{ 
//             border: '1px solid #ccc', 
//             borderRadius: '8px', 
//             padding: '1rem' 
//           }}>
//             <img 
//               src={product.thumbnail} 
//               alt={product.title} 
//               style={{ width: '100%', height: '150px', objectFit: 'cover' }} 
//             />
//             <h3>{product.title}</h3>
//             <p>${product.price}</p>
//           </div>
//         ))}
//       </div>
//       {isFetching && <p style={{ textAlign: 'center', margin: '2rem 0' }}>Loading more products...</p>}
//       {!hasMore && <p style={{ textAlign: 'center', margin: '2rem 0' }}>No more products to load</p>}
//     </div>
//   );
// };

// export default InfiniteScroll;




import React, { useState, useEffect, useRef, useCallback } from 'react';

const PAGE_SIZE = 5;

const InfiniteScrollComments = () => {
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const observerRef = useRef();

  const fetchComments = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/comments?_page=${page}&_limit=${PAGE_SIZE}`
      );
      const data = await res.json();

      setComments((prev) => [...prev, ...data]);
      setHasMore(data.length === PAGE_SIZE);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const lastCommentRef = useCallback((node) => {
    if (loading) return;
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
    });

    if (node) observerRef.current.observe(node);
  }, [loading, hasMore]);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Comments (Infinite Scroll)</h2>
      {comments.map((comment, index) => (
        <div
          key={comment.id}
          ref={index === comments.length - 1 ? lastCommentRef : null}
          style={{
            marginBottom: '1rem',
            borderBottom: '1px solid #ddd',
            paddingBottom: '0.5rem',
          }}
        >
          <h4>{comment.name}</h4>
          <p>{comment.body}</p>
          <small>{comment.email}</small>
        </div>
      ))}
      {loading && <p>Loading...</p>}
      {!hasMore && <p>No more comments to load.</p>}
    </div>
  );
};

export default InfiniteScrollComments;
