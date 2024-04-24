import joi from 'joi'


export const inventoryValidator = joi.object({
    image:joi.string().required().min(10).message('Please add an image'),
    productName:joi.string().required().min(3).message('The product name cannot be less than 3 characters'),
    description:joi.string().required(),
    category:joi.string().required().min(3).message('The category cannot be less than 3 characters'),
    quantity:joi.number().required().min(1).message('Minimum quantity is 1 product'),
    currentPrice:joi.number().required().min(0).message('Price cannot be a negative number'),
    formerPrice:joi.number().required().min(0).message('Price cannot be a negative number')
})