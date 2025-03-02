export const ValidateUser={
    userName:{
        isLength:{
            options:{
                min:5,
                max:32,
            },
            errormessage:"userName must be in between 3-10 characters long"

        },

        notEmpty:{
            errormessage:"userName should not be empty"
            
        },
        isString: {
            errormessage:"userName should be a stringy"
            
        }
    }
}