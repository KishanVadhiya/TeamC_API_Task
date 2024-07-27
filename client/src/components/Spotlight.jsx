import React, { useEffect, useState } from 'react';
import { Container, Grid, Pagination, Box, FormControl, InputLabel, Select, MenuItem, Slider, Typography } from '@mui/material';
import ProductCard from './ProductCard';
import AddProductDialog from './AddProductDialog';

const Spotlight = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [rating, setRating] = useState(0);
  const [sorting, setSorting] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    company: '',
    price: [0, 5000],
    availability: '',
  });

  const updateURL = () => {
    let productURL = 'http://localhost:9999/api/getproducts';

    const queryParams = [];

    if (filters.price[0] !== 0) queryParams.push(`minPrice=${filters.price[0]}`);
    if (filters.price[1] !== 5000) queryParams.push(`maxPrice=${filters.price[1]}`);
    if (filters.availability) queryParams.push(`availability=${filters.availability}`);
    if (filters.category) queryParams.push(`category=${filters.category}`);
    if (filters.company) queryParams.push(`company=${filters.company}`);
    if (sorting) queryParams.push(`sort=${sorting}`);
    if (rating) queryParams.push(`minRating=${rating}`);

    if (queryParams.length > 0) productURL += `?${queryParams.join('&')}`;

    console.log("\nCurrent API URL -", productURL, "\n");

    return productURL;
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:9999/api/categories');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories', error);
      }
    };

    const fetchCompanies = async () => {
      try {
        const response = await fetch('http://localhost:9999/api/companies');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCompanies(data);
      } catch (error) {
        console.error('Error fetching companies', error);
      }
    };

    fetchCategories();
    fetchCompanies();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(updateURL());
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products', error);
      }
    };

    fetchProducts();
  }, [filters, sorting, rating]);

  const handleSorting = (event) => {
    setSorting(event.target.value);
    setCurrentPage(1);
  };

  const handleRatingChange = (event) => {
    setRating(event.target.value);
    setCurrentPage(1);
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters({
      ...filters,
      [name]: value,
    });
    setCurrentPage(1);
  };

  const handleSliderChange = (event, newValue, name) => {
    setFilters({
      ...filters,
      [name]: newValue,
    });
  };

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  const handleDelete = async (productId) => {
      try {
          const response = await fetch(`http://localhost:9999/api/deleteproduct/${productId}`, {
              method: 'DELETE',
          });
  
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
  
          // Remove the deleted product from the state
          setProducts(products.filter(product => product.id !== productId));
      } catch (error) {
          console.error('Error deleting product', error);
      }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>Spotlight</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
              >
                <MenuItem value="">All</MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.name}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <InputLabel>Company</InputLabel>
              <Select
                name="company"
                value={filters.company}
                onChange={handleFilterChange}
              >
                <MenuItem value="">All</MenuItem>
                {companies.map((company) => (
                  <MenuItem key={company.id} value={company.name}>
                    {company.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <InputLabel>Availability</InputLabel>
              <Select
                name="availability"
                value={filters.availability}
                onChange={handleFilterChange}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="yes">Yes</MenuItem>
                <MenuItem value="no">No</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography gutterBottom>Price Range</Typography>
            <Slider
              value={filters.price}
              onChangeCommitted={(event, newValue) => handleSliderChange(event, newValue, 'price')}
              valueLabelDisplay="auto"
              min={0}
              max={5000}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <InputLabel>Rating</InputLabel>
              <Select
                name="rating"
                value={rating}
                onChange={handleRatingChange}
              >
                <MenuItem value={0}>All</MenuItem>
                <MenuItem value={1}>1 or more</MenuItem>
                <MenuItem value={2}>2 or more</MenuItem>
                <MenuItem value={3}>3 or more</MenuItem>
                <MenuItem value={4}>4 or more</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <InputLabel>Sort By</InputLabel>
              <Select
                name="sort"
                value={sorting}
                onChange={handleSorting}
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem value="atoz">A to Z</MenuItem>
                <MenuItem value="ztoa">Z to A</MenuItem>
                <MenuItem value="ratings">Ratings</MenuItem>
                <MenuItem value="discount">Discount</MenuItem>
                <MenuItem value="price-asc">Price - Increasing Order</MenuItem>
                <MenuItem value="price-desc">Price - Decreasing Order</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
      <AddProductDialog />
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
                onDelete={() => handleDelete(product._id)}
                onEdit={() => console.log("edit",product._id)}
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

export default Spotlight;