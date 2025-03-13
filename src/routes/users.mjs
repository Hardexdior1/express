import {Router} from "express"
import { query,validationResult,checkSchema} from "express-validator"
import mockUsers from '../utils/Contents.mjs'
import { resolveIndexByUserId } from "../utils/middlewares.mjs"
import { ValidateUser } from "../utils/ValidateUser.mjs"

const router=Router()

// get users
router.get('/api/users', [query("filter").isString().withMessage('filter value must be a string')
    .notEmpty().withMessage('filter must not be empty').isLength({min:5,max:10})
    .withMessage("characters must be minimum of 5 and maximum of 10")],(request,response)=>{

        console.log(request.session.id)
        request.sessionStore.get(request.session.id,(err,sessionData)=>{
            if (err){
                console.log(err);
                throw err;
            }
            console.log(sessionData+"  session data")

        })
    const {query:{filter}}=request
    const validate=validationResult(request)
    
    if(!filter)response.status(400).send({errors:validate.array()});

    const result=mockUsers.filter((item)=>item.userName.includes(filter))
    response.send(result)
})

//create users
router.post('/api/users',checkSchema(ValidateUser),(request,response)=>{
    const {body}=request
    const result=validationResult(request)
if(!result.isEmpty()) return response.status(400).send({errors:result.array()})
    
    const newUser={id:mockUsers[mockUsers.length-1].id+1,...body}
    mockUsers.push(newUser)
    return response.status(201).send(newUser)
})


//get a user by id
router.get ('/api/users/:id',resolveIndexByUserId,(request,response)=>{
    const {findIndex}=request

        const findUser=mockUsers[findIndex]
        if(!findUser) return response.status(404)
            return response.send(findUser)
})

// put , change the whole data object based on the id passed
router.put('/api/users/:id',resolveIndexByUserId,(request,response)=>{  
const {body,findIndex}=request
mockUsers[findIndex]={id:mockUsers[findIndex].id, ...body}
response.sendStatus(200)
})
// patch, change a particular place in a data object
router.patch('/api/users/:id',resolveIndexByUserId,(request,response)=>{
    const {body,findIndex}=request
     mockUsers[findIndex]={id:mockUsers[findIndex].id,...body}
    response.sendStatus(200)
})
// delete, this delete an entire object from the data based on the id, 
router.delete('/api/users/:id',(request,response)=>{
    const {findIndex}=request
    
     mockUsers.splice(findIndex,1)
    response.sendStatus(200)
})


export default router