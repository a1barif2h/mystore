import mongoose from 'mongoose'

const initDB = () => {
    if(mongoose.connections[0].readyState) {
        console.log('already connected')
        return
    }
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    mongoose.connection.on('connected', () => {
        console.log('mongodb connected successfully')
    })
    mongoose.connection.on('error', (err) => {
        console.log('Error happen in DB connection', err)
    })
}

export default initDB;