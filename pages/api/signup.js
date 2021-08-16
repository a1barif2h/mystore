import bcrypt from 'bcrypt';
import initDB from '../../helpers/initDB';
import Cart from '../../models/Cart';
import User from '../../models/User';

initDB()
const handler = async (req, res) => {
    const {
        name,
        email,
        password
    } = req.body

    console.log(req.body)

    try {
        if(!name || !email || !password) {
            return res.status(422).json({
                error: 'Please fill all the fields!'
            })
        }

        const existingUser = await User.findOne({email})
        if(existingUser) {
            return res.status(422).json({
                error: 'User already exist with that email!'
            })
        }

        const hashPassword = await bcrypt.hash(password, 12)

        const newUser = await new User({
            name,
            email,
            password: hashPassword
        }).save()
        await new Cart({user: newUser._id}).save()
        res.status(201).json({
            success: 'User Add successfully'
        })
    } catch (err) {
        res.status(500).json({
            error: 'Something happened wrong!',
            err
        })
    }
}

export default handler
