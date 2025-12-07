const { StatusCodes } = require("http-status-codes");
const asyncWrapper = require("../Middlewares/asyncWrapper")
const Cart = require("../Models/cartModel");
const { Product } = require("../Models/productModel");
const { notFound, Sucess, Created, ServerError } = require("../Middlewares/returnRes");

const addToCart = asyncWrapper(async(req, res, next) => {
    const userid = req.user;
    // console.log(userid)
    const {productId, quantity, size} = req.body;

    /***********check if product exist**********************/
    try{
        const product = await Product.findById(productId)
        //console.log(product)
        if(!product){
            return notFound(res, "Product does not exist")
        }

        /************find customers cart********************/
        let cart = await Cart.findOne({userid})
        if(!cart){
            cart = new Cart({
                userid,
                items: [{product: productId, quantity, size}]
            })
        }else{
            /******************if user has cart check if the product exist in cart***************/
            const product = cart.items.find((item) => item.product.toString() == productId && item.size == size)
            
            /*******************if the product exist increase the quantity in cart****************/
            if(product){
                product.quantity+= parseInt(quantity);

              /**********else add the product to the cart********************/  
            }else{
                cart.items.push({product: productId, quantity, size})
            }
        }
        await cart.save();
        return Created(res, "Item added to cart", cart)
    }catch(err){
        return ServerError(res, err)
    }
})

/***************Get All Carts*******************************/
const getCarts = asyncWrapper(async(req, res, next) => {
    try{
        const userid = req.user
        const cart = await Cart.findOne({userid}).populate("items.product")
        //console.log("Hello cart", cart)
        if(!cart || cart.items.length === 0){
            return Sucess(res, "Cart is empty", {items: [], total: 0})
        }
        /********map through the cart items to get the product details***************/
        const items = cart.items.map((item)=> {
            const product = item.product; 
            //console.log("this is product", product)
            return {
                product: product._id,
                title: product.title,
                image: product.image, // if multiple image then product.images[0]
                size: item.size,
                quantity: item.quantity,
                inStock: product.inStock,
                discountPrice: product.discountPrice,
                price: product.price,
                subtotal: parseInt(product.price) * parseInt(item.quantity)
            }
        })
        /**********.reduce takes an array and boils it down to a single value****************/
        const total = items.reduce((sum, item) => sum + item.subtotal, 0)
        return res.status(StatusCodes.OK).json({items, total})
    }catch(err){
        ServerError(res, err)
    }
})

/*********************Update Cart items***********************/
const updateCart = asyncWrapper(async(req, res, next) => {
    const {id: productId} = req.params;
    const userid = req.user
    const {quantity, size} = req.body
    const cart = await Cart.findOne({userid})
    if(!cart){
        return notFound(res, "Cart not found")
    }

    const item = cart.items.find((item) => item.product.toString() == productId)
    if(!item){
        return notFound(res, "Product not in cart")
    }
    /******only save if the quantity passed in is greater than 0****************/
    if(quantity > 0){
        item.quantity = quantity;
        item.size = size
    }else{
        /***********remove if its 0 dont add it******************/
        cart.items = cart.items.filter((item) => item.product != productId || item.size != size)
    }
    
    await cart.save()
    return Sucess(res, "Cart item updated", cart)
})

/*******************Remove from cart****************************/
const removeFromCart = asyncWrapper(async(req, res) => {
    const userid = req.user
    const {id: productId} = req.params

    const cart = await Cart.findOne({userid})
    if(!cart){
        return notFound(res, "Cart not found") 
    }
    const item = cart.items.find(item => item.product.toString() == productId)
    if(!item){
        return notFound(res, "Product not in cart")
    }
    /************remove from an array in mongoose other than the javascript filter method***************/
    cart.items.pull({product: productId})
    await cart.save()

    /******return res function from returnRes.js Middleware **************/
    return Sucess(res, "Item removed from cart")
})

/***********************Clear carts***************************/
const clearCart = asyncWrapper(async(req, res, next) => {
    const userid = req.user;
    const cart = await Cart.findOneAndDelete({userid})
    if(!cart){
        return notFound(res, "Cart not found")
    }
    //cart.items = []
    //await cart.save();
    return Sucess(res, "Cart cleared sucessfully", cart)
})

module.exports = {
    addToCart,
    getCarts,
    removeFromCart,
    updateCart,
    clearCart
}






// {
//     "_id": "68d6ea72f286d3898da595cc",
//     "userid": "68d3cac79793448a6dd55c7c",
//     "items": [
//         {
//             "product": {
//                 "_id": "68d6d9c3b49db6e793638bee",
//                 "title": "Adidas Shoe",
//                 "description": "Summer shoe",
//                 "category": "men",
//                 "subCategory": "shirts",
//                 "sizes": "M",
//                 "price": 8000,
//                 "discountPrice": 0,
//                 "inStock": 1,
//                 "image": "image-1758910914426-737486694.png",
//                 "isPromo": "false",
//                 "createdAt": "2025-09-26T18:21:55.174Z",
//                 "updatedAt": "2025-09-26T18:21:55.174Z",
//                 "__v": 0
//             },
//             "quantity": 2,
//             "size": "XL",
//             "_id": "68d6ea72f286d3898da595cd"
//         }
//     ],
//     "createdAt": "2025-09-26T19:33:06.194Z",
//     "updatedAt": "2025-09-26T19:33:06.194Z",
//     "__v": 0
// }