import {Router} from "express"
import { query,validationResult,checkSchema, header} from "express-validator"
import { ValidateProduct } from "../utils/ValidateProduct.mjs"

const router=Router()

const products=[
    {
        id:1,
        productName:"gucci",
        price:100,
    },
    {
        id:2,
        productName:"versace",
        price:300,
    }
]
// test create product
router.post('/api/products',checkSchema(ValidateProduct),(request,response)=>{
    const {body}=request
    const result=validationResult(request)
    if(!result.isEmpty())  return response.status(400).send({errors:result.array()})
    console.log(body)
    return response.status(201).send(body)
})

// get products
router.get('/api/products',(request,response)=>{
    // console.log(request.headers.cookie)
    console.log(request.cookies.hello)
    if(request.cookies.hello&&request.cookies.hello==='world')return response.send(products)
    return response.status(403).send({msg:"sorry you need the correct cookie to access this endpoint"})
})

// search product
router.post("/api/products/search",(request,response)=>{
const {query:{name}}=request
console.log(name)
const filteredProduct=products.filter((item)=>item.productName.toLowerCase()===name.toLowerCase())
if(name=="") return response.status(400).send('werey you no add wetin you dey search for')
if(filteredProduct.length===0)
return response.status(400).send("na you know the kind product you dey find, e no dey sha")
return response.status(201).send(filteredProduct)
})
// get a product by id
router.get("/api/products/:id",(request,response)=>{
const {id}=request.params
    const filteredProduct=products.find((item)=>item.id==parseInt(id))
    if(!filteredProduct) return response.status(404).send({message:"product not found"})
    return response.status(201).send(filteredProduct)
})

// delete a product
router.delete('/api/products/:id',(request,response)=>{
    const {id}=request.params
    
    console.log(id)
    })

export default router