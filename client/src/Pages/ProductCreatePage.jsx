import { useFormik } from "formik";
import * as yup from "yup";
import { useSelector } from "react-redux";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SellerNavbar from "../Components/SellerNavbar";
import ImgDrop from "../Components/ImgDrop";
import { useEffect, useState } from "react";
import { red } from "@mui/material/colors";

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
  const [imgDropError, setImgDropError] = useState(false);

  useEffect(() => {
    if (productImgs) {
      setImgDropError(false);
    }
  }, [productImgs]);

  const handleDropzoneValue = (value) => {
    setProductImgs(value);
    setImgDropError(false)
    console.log(value);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      for (const value in values) {
        formData.append(value, values[value]);
      }
      for (const productImg of productImgs) {
        formData.append(`productImgs`, productImg);
      }
      const productImgsName = productImgs
        .map((productImg) => productImg.name)
        .join(",");
      formData.append("productImgsName", productImgsName);

      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/products/create`, {
        method: "POST",
        headers: {
          "Seller-Authorization": sellerToken,
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
        <Typography textAlign="center" p="2rem" variant="h2" gutterBottom>
          Fill product info
        </Typography>
        <Stack
          component="form"
          alignItems="center"
          spacing={3}
          padding={4}
          onSubmit={formik.handleSubmit}>
          <ImgDrop onDropzoneValue={handleDropzoneValue} />
          <FormHelperText sx={{ color: red[700], width: "100%" }}>
            {imgDropError ? "Images not uploaded." : ""}
          </FormHelperText>
          <TextField
            sx={{ m: 1 }}
            variant="outlined"
            fullWidth
            color="grey"
            id="name"
            name="name"
            label="Product name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <FormControl fullWidth>
            <InputLabel
              id="category"
              sx={{
                color:
                  formik.touched.category && Boolean(formik.errors.category)
                    ? red[700]
                    : undefined,
              }}>
              Age
            </InputLabel>
            <Select
              labelId="category"
              id="category"
              name="category"
              label="Category"
              value={formik.values.category}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.category && Boolean(formik.errors.category)
              }>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="fashion">Fashion</MenuItem>
              <MenuItem value="homeAndKitchen">Home & kitchen</MenuItem>
              <MenuItem value="electronics">Electronics</MenuItem>
              <MenuItem value="beautyPicks">Beauty picks</MenuItem>
              <MenuItem value="mobileAndTablets">Mobile & tablets</MenuItem>
              <MenuItem value="healthAndPersonalCare">
                Health & Personal Care
              </MenuItem>
              <MenuItem value="books">Books</MenuItem>
              <MenuItem value="tvAppliances">Tv appliances</MenuItem>
            </Select>
            <FormHelperText
              sx={{
                color:
                  formik.touched.category && Boolean(formik.errors.category)
                    ? red[700]
                    : undefined,
              }}>
              {formik.touched.category && formik.errors.category}
            </FormHelperText>
          </FormControl>
          {/* variant selector have to add */}
          <Stack spacing={3} direction="row" sx={{ m: 1, width: "100%" }}>
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
            color="grey"
            id="stock"
            name="stock"
            label="Stock"
            value={formik.values.stock}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.stock && Boolean(formik.errors.stock)}
            helperText={formik.touched.stock && formik.errors.stock}
          />
          <TextField
            sx={{ m: 1 }}
            variant="outlined"
            fullWidth
            color="grey"
            multiline
            rows={6}
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
            color="grey"
            multiline
            rows={6}
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
          <Button
            color="primary"
            variant="contained"
            type="submit"
            onClick={() => {
              if (!productImgs) setImgDropError(true);
            }}>
            Submit
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}

export default ProductCreatePage;
