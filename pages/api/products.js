import initDB from "../../helpers/initDB";
import Product from "../../models/Products";

initDB()

export default async function handler(req, res) {
  const {method} = req

  if(method === "GET") {

    try {
      const response = await Product.find()
      res.status(200).json(response)
    } catch (error) {
      res.status(500).json({
        message: 'Response failed!',
        error
      })
    }

  } else if(method === "POST") {

    const {
      body: {
        name,
        price,
        mediaUrl,
        description
      }
    } = req

    if(!name || !price || !mediaUrl || !description) {
      return res.status(422).json({
        error: 'Please fill all the fields!'
      })
    }

    try {
      await new Product({
        name,
        price,
        mediaUrl,
        description
      }).save()
      res.status(201).json({
        success: 'Product added successfully'
      })
    } catch (error) {
      res.status(500).json({
        error: 'Something happened wrong!'
      })
    }
    
  }
}
