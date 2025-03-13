
import express from 'express'
import userRouter from './routes/users.mjs'
import productRouter from "./routes/product.mjs"
import cookieParser from 'cookie-parser'
import session from 'express-session'
import users from './utils/Constance.mjs'
import passport from 'passport'
import './strategis/local-strategy.mjs'

const app=express()

app.use(express.json())
app.use(cookieParser('hello world'))

app.use(session(
    {
        secret:"quwam the dev",
        saveUninitialized:false,
        resave:false,
        cookie:{
            maxAge:60000*60,
        }
    }
))
app.use(passport.initialize())
app.use(passport.session())
app.use(userRouter)
app.use(productRouter)



const PORT=process.env.PORT||'3001'


// console.log(mockUsers[mockUsers.length])
app.get('/',(request,response)=>{
    console.log(request.sessionID)
    request.session.visited=true;

    response.cookie('hello',"world",{maxAge:60000*60*2, signed:true})
        response.status(201).send({msg:"how you dey, omo werey"})

})

// login user
// app.post("/api/auth",(request,response)=>{
// const {body:{username,password}}=request

// // const findUser=users.find((item))
// const findUser=users.find((item)=>item.username==username&&item.password==password)

// if(!findUser) return response.status(401).send({message:'BAD CREDENTIALS'})

//     request.session.user=findUser

//   return  response.status(201).send(findUser)

// })

// login user using passport auth
app.post('/api/auth',passport.authenticate("local"),(request,response)=>{

})

// get user status
app.get('/api/auth/status',(request,response)=>{
    console.log(request.session.user)
    request.sessionStore.get(request.sessionID,(err,session)=>{

        if(err){
            console.log(err)
            throw err;
        }
        console.log(session)

    })
return request.session.user?response.status(201).send(request.session.user): response.status(401).send({message:"not authenticated"})
})


//create cart cart
app.post('/api/cart',(request,response)=>{
if(!request.session.user) return response.sendStatus(401)
    const {body:item}=request

const {cart}=request.session
if(cart){
    cart.push(item)
}else{
    request.session.cart=[item]
}
response.status(201).send(item)
})

// get cart
app.get('/api/cart',(request,response)=>{
    if(!request.session.user) return response.sendStatus(401)
        // const {body:item}=request
    
    const {cart}=request.session
    // if(cart){
    //     cart.push(item)
    // }else{
    //     request.session.cart=[item]
    // }
    response.status(201).send(cart??[])
    })

app.listen(PORT,()=>{
    console.log(`running on port ${PORT}`)
})