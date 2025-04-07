const express = require("express");
const router = express.Router();
const {
    addProduct,
    fetchAllProducts,
    editProduct,
    deleteProduct,
} = require("../../controllers/admin/products-controller");

router.post("/add", addProduct); // Changed to /add
router.get("/get", fetchAllProducts); // Changed to /get
router.put("/edit/:id", editProduct); // Correct
router.delete("/delete/:id", deleteProduct); // Correct

module.exports = router;