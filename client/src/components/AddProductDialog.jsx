import React, { useState } from 'react';
import {
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
  Button, TextField, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';

const AddProductDialog = ({ onAddProduct }) => {
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState({
    name: '',
    category: '',
    price: '',
    company: '',
    availability: '',
    discount: '',
    rating: '',
  });

  const [companies, setCompanies] = useState([
    { description: "Amazon", id: 1, name: "AMZ" },
    { description: "Flipkart", id: 2, name: "FLP" },
    { description: "Snapdeal", id: 3, name: "SNP" },
    { description: "Myntra", id: 4, name: "MYN" },
    { description: "Amazon", id: 5, name: "AZO" }
  ]);

  const [categories, setCategories] = useState([
    { id: 1, name: "Phone" },
    { id: 2, name: "Computer" },
    { id: 3, name: "TV" },
    { id: 4, name: "Earphone" },
    { id: 5, name: "Tablet" },
    { id: 6, name: "Charger" },
    { id: 7, name: "Mouse" },
    { id: 8, name: "Keypad" },
    { id: 9, name: "Bluetooth" },
    { id: 10, name: "Pendrive" },
    { id: 11, name: "Remote" },
    { id: 12, name: "Speaker" },
    { id: 13, name: "Headset" },
    { id: 14, name: "Laptop" },
    { id: 15, name: "PC" }
  ]);

  const [newCompanyOpen, setNewCompanyOpen] = useState(false);
  const [newCategoryOpen, setNewCategoryOpen] = useState(false);
  const [newCompanyName, setNewCompanyName] = useState('');
  const [newCompanyDescription, setNewCompanyDescription] = useState('');
  const [newCategory, setNewCategory] = useState('');

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

  const handleSubmit = () => {
    onAddProduct(product);
    handleClose();
  };

  const handleAddCompany = () => {
    setCompanies([...companies, {
      description: newCompanyDescription,
      id: companies.length + 1,
      name: newCompanyName
    }]);
    setNewCompanyName('');
    setNewCompanyDescription('');
    setNewCompanyOpen(false);
  };

  const handleAddCategory = () => {
    setCategories([...categories, { id: categories.length + 1, name: newCategory }]);
    setNewCategory('');
    setNewCategoryOpen(false);
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
            name="name"
            label="Name"
            type="text"
            fullWidth
            value={product.name}
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
    </div>
  );
};

export default AddProductDialog;