import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import initDB from '../../helpers/initDB';
import User from '../../models/User';

initDB()

const handler =  async (req, res) => {
    try {
        const {
            body: {
                email,
                password
            }
        } = req

        if(!email || !password) {
            return res.status(422).json({error: 'Please fill all the fields!'})
        }
        
        const user = await User.findOne({email})

        if(!user) {
            return res.status(404).json({error: 'Email or password is wrong!'})
        }

        const isMatched = await bcrypt.compare(password, user.password)

        if(isMatched) {
            const token = jwt.sign({userId: user._id}, process.env.JWT_SEACRATE, {
                expiresIn: '7d'
            })
            const {name, email, role} = user
            return res.status(201).json({token, user: {name, email, role}, success: 'Login Success!'})
        } else {
            return res.status(404).json({error: 'Email or password is wrong!'})
        }
    } catch (err) {
        res.status(500).json({error: 'Something happened wrong!', err})
    }
}

export default handler