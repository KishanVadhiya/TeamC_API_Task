import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import ProductCard from './ProductCard';
import { Container, Grid, Pagination, Box } from '@mui/material';

// const UnsplashAccessKey = 'aVhwloBHIg3J6I1FchuFQt-rr1kwoHJR-lpfzPYBjnI';
// console.log("\n\n Just checking out\n\n");
const AllProduct = () => {
  const [products, setProducts] = useState([]);
  // const [photos, setPhotos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = () => {
      // try {
      //   const productResponse = await axios.get('/api/products');
      //   setProducts(productResponse.data);
      // } catch (error) {
      //   console.error('Error fetching products', error);
      // }

      fetch('/api/products')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setProducts(data);
      })
      .catch(error => {
        console.error('Error fetching products', error);
      });
    };

    // const fetchPhotos = async (searchQuery = 'phone laptop ') => {
    //   try {
    //     const response = await axios.get('https://api.unsplash.com/search/photos', {
    //       headers: {
    //         Authorization: `Client-ID ${UnsplashAccessKey}`,
    //       },
    //       params: {
    //         query: searchQuery,
    //         per_page: 2,
    //       },
    //     });
    //     setPhotos(response.data.results);
    //   } catch (err) {
    //     setError(err.message);
    //   }
    // };

    fetchProducts();
    // fetchPhotos();
  }, []);

  // const mergedData = products.map((product, index) => ({
  //   ...product,
  //   imgURL: photos[index % photos.length]?.urls?.regular || 'defaultImageURL',
  // }));

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Grid container spacing={4}>
          {currentItems.map(product => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <ProductCard
                imgURL={product.imgURL}
                availability={product.availability}
                category={product.category}
                company={product.company}
                discount={product.discount}
                id={product.id}
                price={product.price}
                productName={product.productName}
                rating={product.rating}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <Pagination
          count={Math.ceil(products.length / itemsPerPage)}
          page={currentPage}
          onChange={handleChangePage}
          color="primary"
        />
      </Box>
    </Container>
  );
};

export default AllProduct;