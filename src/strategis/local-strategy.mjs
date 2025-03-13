import passport from 'passport'
import {Strategy} from 'passport-local'
import users from '../utils/Constance.mjs'


passport.serializeUser((user,done)=>{
    done(null,user.id)

})

passport.deserializeUser((id,done)=>{
try{
    const  findUser=users.find((user)=>user.id===id)
    if(!findUser) throw new Error("user not found");
    done(null,findUser)

}
catch(error){
    done(error,null)

}
})
export default passport.use(
    new Strategy((username,password,done)=>{
        console.log(`username: ${username}`)
        console.log(`password: ${password}`)

     try {

        const  findUser=users.find((user)=>user.username==username)
        if(!findUser) throw new Error("user not found");
        if(findUser.password!==password) throw new Error ('invalid password')
        done(null,findUser)
     } catch (error) {

        done(error,null)
        
     }
    })
)