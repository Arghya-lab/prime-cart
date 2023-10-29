import { Box } from '@mui/material'
import FilterWidget from '../Components/FilterWidget'
import ProductWidget from '../Components/ProductWidget'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'

function CategoryProductPage() {
  return (
    <>
      <Navbar />
      <Box>
        <FilterWidget />
        <Box sx={{ width: "100%" }}>
          <ProductWidget />
        </Box>
      </Box>
      <Footer />
    </>
  )
}

export default CategoryProductPage