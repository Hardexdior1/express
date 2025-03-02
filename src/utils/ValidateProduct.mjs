export const ValidateProduct={
    productName:{
        notEmpty:{
            errorMessage:"productName is required"
        },
        isLength:{
            options:{min:3, max:10},
            errorMessage:"productName should be from 3 to 10 characters long"
        }

    }
}