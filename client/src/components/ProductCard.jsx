import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions, IconButton, Box, Modal, TextField, Button, Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  maxHeight: '80vh',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  outline: 'none',
  overflowY: 'auto',
};

export default function ProductCard({ imgURL, availability, category, company, discount, id, price, productName, rating, onEdit, onDelete }) {
  const [open, setOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    imgURL,
    availability,
    category,
    company,
    discount,
    price,
    productName,
    rating
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = () => {
    onEdit(id, formValues);
    handleClose();
  };

  return (
    <>
      <Card sx={{ maxWidth: 345, m: 2, boxShadow: 3 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={imgURL}
            alt={productName}
          />
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography gutterBottom variant="h5" component="div">
                {productName}
              </Typography>
              <Box>
                <IconButton color="primary" onClick={handleOpen}>
                  <EditIcon />
                </IconButton>
                <IconButton color="secondary" onClick={() => onDelete(id)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
            <Typography variant="body2" color="text.secondary">
              ID: {id}
              <br />
              Company: {company}
              <br />
              Price: ₹{price}
              <br />
              Category: {category}
              <br />
              Availability: {availability}
              <br />
              Rating: {rating}
              <br />
              Discount: {discount}%
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="edit-product-modal"
        aria-describedby="edit-product-form"
      >
        <Box sx={modalStyle}>
          <Typography id="edit-product-modal" variant="h6" component="h2" sx={{ mb: 2 }}>
            Edit Product
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Product Name"
                name="productName"
                value={formValues.productName}
                onChange={handleChange}
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Company"
                name="company"
                value={formValues.company}
                onChange={handleChange}
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Price"
                name="price"
                value={formValues.price}
                onChange={handleChange}
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Category"
                name="category"
                value={formValues.category}
                onChange={handleChange}
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Availability"
                name="availability"
                value={formValues.availability}
                onChange={handleChange}
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Rating"
                name="rating"
                value={formValues.rating}
                onChange={handleChange}
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Discount"
                name="discount"
                value={formValues.discount}
                onChange={handleChange}
                size="small"
              />
            </Grid>

          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button onClick={handleClose} sx={{ mr: 1 }}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} variant="contained">
              Save Changes
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}