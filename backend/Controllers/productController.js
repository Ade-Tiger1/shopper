const asyncWrapper = require("../Middlewares/asyncWrapper");
const { Product } = require("../Models/productModel");
const mongoose = require("mongoose");
const path = require("path")
const fs = require("fs");
const { notFound, Sucess, Conflict, Created, ServerError, badRequest } = require("../Middlewares/returnRes");
const { StatusCodes } = require("http-status-codes");

const createProduct = asyncWrapper(async(req, res, next) => {
    const {title, description, price} = req.body;
    if(!title || !description || !req.files || !price){
        return badRequest(res, "Fill In Complete Details")
    }
    const productCheck = await Product.findOne({title, description})
    if(productCheck){
        req.files.forEach(file => {
            fs.unlink(file.path, (err) => {
                if(err){
                    console.log("Error in deleting file", err.message)
                }
            })
        
        })
        return Conflict(res, "Product Already Exist");
    }

    const images = req.files.map(image => image.filename);
    /*********Create New Product******************/
    const newProducts = new Product({
    ...req.body,
    sizes: JSON.parse(req.body.sizes || '[]'), // convert string back to array
    image: images
});
    try{
        await newProducts.save()
        return Created(res, "Product Created Sucessfully", newProducts)
    }catch(err){
        return ServerError(res, err)
    }
})

const getAllProduct = asyncWrapper(async(req, res, next) => {
    const {title, category, subCategory, size, price, isPromo, sort} = req.query;
    const queryObject = {};
    const catField = ["men", "women", "kids"];
    const subField = ["tousers", "shirts", "caps", "shoes", "gowns", "shorts"];
    const sizeField = ["S", "M", "L", "XL", "XXL"]

    if(title){
        queryObject.title = {$regex: title, $options: "i"};
    }
    if(category && catField.includes(category)){
        queryObject.category = {$regex: category, $options: "i"};
    }
    if(subCategory && subField.includes(subCategory)){
        queryObject.subCategory = {$regex: subCategory, $options: "i"};
    }
    if(size && sizeField.includes(size)){
        queryObject.size = size;
    }
    if(isPromo){
        queryObject.isPromo = isPromo ? true : false;
    }
    let result = Product.find(queryObject)
    if(sort){
        const sortedList = sort.split(",").join(" ")
        result = result.sort(sortedList)
    }else{
        result = result.sort("createdAt")
    }
    const products = await result;
    if(!products){
        return notFound(res, "No Product Found");
    }
    return res.status(StatusCodes.OK).json({count: products.length, products})
})



const deleteProduct = asyncWrapper(async(req, res, next) => {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return badRequest(res, "Invalid Product ID");
        }
        const product = await Product.findById(id);
        if (!product) {
            return notFound(res, "Product not found");
        }
        /**********delete image from folder******************/
        if (product.image && product.image.length > 0) {
            product.image.forEach(image => {
                const imagePath = path.join(__dirname, "..", "uploads/images", image);
                fs.unlink(imagePath, (err) => {
                    if (err) {
                        console.log("Error in deleting image", err.message);
                    }
                });
            })
        }
        await product.deleteOne();
        return Sucess(res, "Product deleted successfully")
})

const updateProduct = asyncWrapper(async(req, res, next)=>{
    const {id} = req.params;
    const product = await Product.findById(id)
    if(!product){
        return notFound(res, "Product not found");
    }
    /********handle new file updated**************/
    let newImages = [];
    if(req.files && req.files.length > 0){
        /********delete old images from folder***************/
        newImages = req.files.map(file => file.filename);
        /****find old product and delete from disk*******/
        const oldProduct = await Product.findById(id);
        if(!oldProduct){
            /*******clean up uploaded files since no product found**************/
            req.files.forEach(file => {
                const imagePath = path.join(__dirname, "..", "uploads/images", file.filename);
                fs.unlink(imagePath, (err) => {
                    if(err){
                        console.log("Error in deleting file", err.message)
                    }
                })
            })
            return notFound(res, "Product not found");
        }
        if(oldProduct.image && oldProduct.image.length > 0){
            oldProduct.image.forEach(image => {
                const imagePath = path.join(__dirname, "..", "uploads/images", image);
                fs.unlink(imagePath, (err) => {
                    if(err){
                        console.log("Error in deleting image", err.message)
                    }
                })
            })
        }
    }

    const updatedData = {...req.body};
    if(newImages.length > 0){
        updatedData.image = newImages
    }
    // console.log(updatedData)
    
    /************update other field**********************/
    const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, {new: true, runValidators: true})
    return Sucess(res, "Product updated sucessfully", updatedProduct);
})

module.exports = {
    createProduct,
    getAllProduct,
    deleteProduct,
    updateProduct,
}