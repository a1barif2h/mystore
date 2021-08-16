import jwt from 'jsonwebtoken';
import initDB from "../../helpers/initDB";
import Cart from '../../models/Cart';

initDB()

const handler = async (req, res) => {
    switch (req.method) {
        case 'GET':
            await getUserCart(req, res)
            break;
        case 'PUT':
            await updateUserCart(req, res)
            break;
        case 'DELETE':
            await removeUserCart(req, res)
            break;
    
        default:
            break;
    }
    
}

const Authenticated = (icomponent) => {
    return (req, res) => {
        try {
            const {headers: {authorization}} = req
            if(!authorization) {
                return res.status(401).json({error: 'UnAuthorized! Please login'})
            }
            const {userId} = jwt.verify(authorization, process.env.JWT_SEACRATE)
            req.userId = userId
            return icomponent(req, res)
        } catch (err) {
            return res.status(500).json({error: 'UnAuthorized! Please login', err})
        }
    }
}

const getUserCart = Authenticated(async (req, res) => {
    const {products} = await Cart.findOne({user:req.userId}).populate('products.product')
    res.status(200).json(products)
})

const updateUserCart = Authenticated(async (req, res) => {
    const {body: {quantity, productId}} = req
    const userCart = await Cart.findOne({user: req.userId})
    const productExist = userCart.products.some(product => product.product.toString() === productId
    )
    if(productExist) {
        await Cart.findOneAndUpdate(
            {_id:userCart._id,'products.product': productId},
            {$inc:{'products.$.quantity': quantity}}
        )
    } else {
        const newProduct = {quantity, product: productId}
        await Cart.findOneAndUpdate({_id: userCart._id}, {$push: {products: newProduct}})
    }

    res.status(200).json({success: 'Product add in card'})
})

const removeUserCart = Authenticated(async (req, res) => {
    const {body: {productId}} = req
    const {products} = await Cart.findOneAndUpdate(
        {user: req.userId},
        {$pull: {products: {product: productId}}},
        {new: true}
    ).populate('products.product')

    res.status(200).json({products, success: 'Product removed successfully'})
})

export default handler;