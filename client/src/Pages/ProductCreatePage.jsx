import { useFormik } from "formik";
import * as yup from "yup";
import { useSelector } from "react-redux";
import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SellerNavbar from "../Components/SellerNavbar";
import ImgDrop from "../Components/ImgDrop";
import { useState } from "react";

const initialValues = {
  name: "",
  category: "",
  mrp: "",
  selling: "",
  description: "",
  highlights: "",
  stock: "",
};
const validationSchema = yup.object({
  name: yup.string("Enter product name").required("Product name is required"),
  category: yup
    .string("Enter product category")
    .required("category is required"),
  mrp: yup.number("Enter product name").required("Product name is required"),
  selling: yup
    .number("Enter product name")
    .required("Product name is required"),
  description: yup
    .string("Enter product name")
    .required("Product name is required"),
  highlights: yup
    .string("Enter product name")
    .required("Product name is required"),
  stock: yup.number("Enter product name").required("Product name is required"),
});

function ProductCreatePage() {
  const sellerToken = useSelector((state) => state.auth.sellerToken);
  const [productImgs, setProductImgs] = useState(null);

  const handleDropzoneValue = (value) => {
    setProductImgs(value);
    console.log(value);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      console.log(productImgs);
      const formData = new FormData()
      for (const value in values) {
        formData.append(value, values[value])
      }
      const productImgsName = productImgs.map(productImg=>productImg.name)
      for (let i = 0; i < productImgs.length; i++) {
        formData.append(`productImgs`, productImgs[i]);
      }
      // formData.append("productImgs", productImgs);
      formData.append("productImgsName", productImgsName);
      console.log(formData);

      const res = await fetch("http://localhost:8000/api/products/create", {
        method: "POST",
        headers: {
          "seller-auth": sellerToken,
        },
        body: formData,
      });
      const json = await res.json();
      if (json.success) {
        console.log("product created");
        console.log(json.data);
      } else {
        console.log(json.error);
      }
    },
  });


  return (
    <Box>
      <SellerNavbar />
      <Paper elevation={8} sx={{ m: "2rem auto", maxWidth: "768px" }}>
        <Typography textAlign="center" p="2rem" variant="h4" gutterBottom>
          Fill product info
        </Typography>
        <Stack
          component="form"
          alignItems="center"
          spacing={3}
          padding={4}
          onSubmit={formik.handleSubmit}>
          <ImgDrop onDropzoneValue={handleDropzoneValue} />
          <TextField
            sx={{ m: 1 }}
            variant="outlined"
            fullWidth
            id="name"
            name="name"
            label="Product name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            sx={{ m: 1 }}
            variant="outlined"
            fullWidth
            id="category"
            name="category"
            label="Category"
            value={formik.values.category}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.category && Boolean(formik.errors.category)}
            helperText={formik.touched.category && formik.errors.category}
          />
          {/* variant selector have to add */}
          <Stack
            spacing={3}
            direction="row"
            fullWidth
            sx={{ m: 1, width: "100%" }}>
            <TextField
              variant="outlined"
              fullWidth
              id="mrp"
              name="mrp"
              label="Maximum retail price"
              value={formik.values.mrp}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.mrp && Boolean(formik.errors.mrp)}
              helperText={formik.touched.mrp && formik.errors.mrp}
            />
            <TextField
              variant="outlined"
              fullWidth
              id="selling"
              name="selling"
              label="Selling price"
              value={formik.values.selling}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.selling && Boolean(formik.errors.selling)}
              helperText={formik.touched.selling && formik.errors.selling}
            />
          </Stack>
          <TextField
            sx={{ m: 1 }}
            variant="outlined"
            fullWidth
            id="description"
            name="description"
            label="Description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
          />
          <TextField
            sx={{ m: 1 }}
            variant="outlined"
            fullWidth
            id="highlights"
            name="highlights"
            label="Highlights"
            value={formik.values.highlights}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.highlights && Boolean(formik.errors.highlights)
            }
            helperText={formik.touched.highlights && formik.errors.highlights}
          />
          <TextField
            sx={{ m: 1 }}
            variant="outlined"
            fullWidth
            id="stock"
            name="stock"
            label="Stock"
            value={formik.values.stock}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.stock && Boolean(formik.errors.stock)}
            helperText={formik.touched.stock && formik.errors.stock}
          />
          <Button color="primary" variant="contained" type="submit">
            Submit
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}

export default ProductCreatePage;
