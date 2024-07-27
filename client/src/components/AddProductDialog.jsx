import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
  Button, TextField, FormControl, InputLabel, Select, MenuItem, Snackbar,
  Alert
} from '@mui/material';
import axios from 'axios';

const AddProductDialog = ({ onAddProduct }) => {
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState({
    productName: '',
    category: '',
    price: '',
    company: '',
    id: Math.floor(Math.random() * 1000),
    availability: '',
    discount: '',
    rating: '',
  });
  const [companies, setCompanies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newCompanyOpen, setNewCompanyOpen] = useState(false);
  const [newCategoryOpen, setNewCategoryOpen] = useState(false);
  const [newCompanyName, setNewCompanyName] = useState('');
  const [newCompanyDescription, setNewCompanyDescription] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    const fetchCompaniesAndCategories = async () => {
      try {
        const [companiesResponse, categoriesResponse] = await Promise.all([
          axios.get('http://localhost:9999/api/companies'),
          axios.get('http://localhost:9999/api/categories')
        ]);

        setCompanies(companiesResponse.data);
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.error('Error fetching companies and categories:', error);
      }
    };

    fetchCompaniesAndCategories();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:9999/api/addproduct', product);
      console.log('Product added successfully:', response.data);
      if (onAddProduct) onAddProduct(response.data);
      setSnackbarMessage('Product added successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      handleClose();
    } catch (error) {
      console.error('Error adding product:', error);
      setSnackbarMessage('Error adding product.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleAddCompany = async () => {
    try {
      const response = await axios.post('http://localhost:9999/api/addCompanies', {
        name: newCompanyName,
        description: newCompanyDescription,
        id: Math.floor(Math.random() * 1000),
      });
      setCompanies([...companies, response.data]);
      setNewCompanyName('');
      setNewCompanyDescription('');
      setNewCompanyOpen(false);
      setSnackbarMessage('Company added successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error adding company:', error);
      setSnackbarMessage('Error adding company.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleAddCategory = async () => {
    try {
      const response = await axios.post('http://localhost:9999/api/addCategory', {
        name: newCategory,
        id: Math.floor(Math.random() * 1000),
      });
      setCategories([...categories, response.data]);
      setNewCategory('');
      setNewCategoryOpen(false);
      setSnackbarMessage('Category added successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error adding category:', error);
      setSnackbarMessage('Error adding category.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Add Product
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Product</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill out the form to add a new product.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="productName"
            label="Product Name"
            type="text"
            fullWidth
            value={product.productName}
            onChange={handleChange}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={product.category}
              onChange={handleChange}
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.name}>
                  {category.name}
                </MenuItem>
              ))}
              <MenuItem value="" onClick={() => setNewCategoryOpen(true)}>+ Add Category</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            name="price"
            label="Price"
            type="number"
            fullWidth
            value={product.price}
            onChange={handleChange}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Company</InputLabel>
            <Select
              name="company"
              value={product.company}
              onChange={handleChange}
            >
              {companies.map((company) => (
                <MenuItem key={company.id} value={company.name}>
                  {company.description}
                </MenuItem>
              ))}
              <MenuItem value="" onClick={() => setNewCompanyOpen(true)}>+ Add Company</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel>Availability</InputLabel>
            <Select
              name="availability"
              value={product.availability}
              onChange={handleChange}
            >
              <MenuItem value="yes">Yes</MenuItem>
              <MenuItem value="no">No</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            name="discount"
            label="Discount"
            type="number"
            fullWidth
            value={product.discount}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="rating"
            label="Rating"
            type="number"
            fullWidth
            value={product.rating}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Discard
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for adding new company */}
      <Dialog open={newCompanyOpen} onClose={() => setNewCompanyOpen(false)}>
        <DialogTitle>Add Company</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Company Name"
            type="text"
            fullWidth
            value={newCompanyName}
            onChange={(e) => setNewCompanyName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Company Description"
            type="text"
            fullWidth
            value={newCompanyDescription}
            onChange={(e) => setNewCompanyDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setNewCompanyOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddCompany} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for adding new category */}
      <Dialog open={newCategoryOpen} onClose={() => setNewCategoryOpen(false)}>
        <DialogTitle>Add Category</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Category Name"
            type="text"
            fullWidth
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setNewCategoryOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddCategory} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AddProductDialog;
