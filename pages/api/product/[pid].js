import initDB from '../../../helpers/initDB';
import Product from '../../../models/Products';

initDB()
const handler = async (req, res) => {
    const {
        query: {
            pid
        },
        method
    } = req;

    if(method === "GET") {
        try {
            const product = await Product.findOne({_id: pid})
            res.status(200).json(product)
        } catch (error) {
            res.status(500).json({
                message: 'Something happened wrong!',
                error
            })
        }
    } else if (method === "DELETE") {
        try {
            await Product.findByIdAndDelete({_id: pid})
            res.status(200).json({
                message: 'Product delete successfully!'
            })
        } catch (error) {
            res.status(500).json({
                message: 'Something happened wrong!',
                error
            })
        }
    }
    
}

export default handler;