import joi from 'joi'

export const regusterUserValidation = joi.object({
    firstName:joi.string().required(),
    lastName:joi.string().required(),
    email:joi.string().required().email({
        minDomainSegments:2, tlds:{
            allow:['com', 'ke']
        }
    }).message('Invalid email format'),
    phoneNumber:joi.string().required().min(10).message('Phone number should be at least 10 characters'),
    password:joi.string().required().pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*()_+\\-=\\[\\]{};:\'"|,.<>\\/\\\\]{8,30}$'))
    .message('Password must be 8-30 characters and must contain a special character.')
})