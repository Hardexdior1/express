import express from 'express'
import userRouter from './routes/users.mjs'
import productRouter from "./routes/product.mjs"
import cookieParser from 'cookie-parser'
const app=express()

app.use(express.json())
app.use(cookieParser())
app.use(userRouter)
app.use(productRouter)


const PORT=process.env.PORT||'3001'


// console.log(mockUsers[mockUsers.length])
app.get('/',(request,response)=>{

    response.cookie('hello',"world",{maxAge:60000*60*2})
        response.status(201).send({msg:"how you dey, omo werey"})

})







app.listen(PORT,()=>{
    console.log(`running on port ${PORT}`)
})