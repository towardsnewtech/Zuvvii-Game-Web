import JoiBase from 'joi'
import { fileListExtension } from 'joi-filelist'
import { joiPasswordExtendCore } from 'joi-password'
const joiPassword = JoiBase.extend(joiPasswordExtendCore);

const registerValidation = joiPassword.object({
  userName : joiPassword.string()
  .required()
  .messages({
    'any.empty' : "⚠ User Name is Required",
    "any.required" : "⚠ User Name is Required",
    'string.empty' : "⚠ User Name is Required",
    'string.required' : "⚠ User Name is Required"
  }),
  firstName : joiPassword.string()
  .required()
  .messages({
    'any.empty' : "⚠ First Name is Required",
    "any.required" : "⚠ First Name is Required",
    'string.empty' : "⚠ First Name is Required",
    'string.required' : "⚠ First Name is Required"
  }),
  lastName : joiPassword.string()
  .required()
  .messages({
    'any.empty' : "⚠ Last Name is Required",
    "any.required" : "⚠ Last Name is Required",
    'string.empty' : "⚠ Last Name is Required",
    'string.required' : "⚠ Last Name is Required"
  }),
  emailAddress: joiPassword.string()
   .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
   .messages({
    'string.empty': '⚠ Email is required',
    'string.email': '⚠ Please enter a valid email address',
    'any.required': '⚠ Email is required',
  }),
  passHash: joiPassword
    .string()
    .minOfSpecialCharacters(2)
    .minOfLowercase(2)
    .minOfUppercase(1)
    .minOfNumeric(2)
    .noWhiteSpaces()
    .onlyLatinCharacters()
    .messages({
        'string.empty' : '⚠ Password should not be empty',
        'password.minOfUppercase': '⚠ Password should contain at least {#min} uppercase character',
        'password.minOfSpecialCharacters':
              '⚠ Password should contain at least {#min} special character',
        'password.minOfLowercase': '⚠ Password should contain at least {#min} lowercase character',
        'password.minOfNumeric': '⚠ Password should contain at least {#min} numeric character',
        'password.noWhiteSpaces': '⚠ Password should not contain white spaces',
        'password.onlyLatinCharacters': '⚠ Password should contain only latin characters',
    }),
    passHash2: joiPassword
    .string()
    .valid(joiPassword.ref('passHash'))
    .minOfSpecialCharacters(2)
    .minOfLowercase(2)
    .minOfUppercase(1)
    .minOfNumeric(2)
    .noWhiteSpaces()
    .onlyLatinCharacters()
    .options({ messages: { 'any.only': 'Re-password does not match'} })
    .messages({
        'string.empty' : 'Password should not be empty',
        'password.minOfUppercase': 'Password should contain at least {#min} uppercase character',
        'password.minOfSpecialCharacters':
              'Password should contain at least {#min} special character',
        'password.minOfLowercase': 'Password should contain at least {#min} lowercase character',
        'password.minOfNumeric': 'Password should contain at least {#min} numeric character',
        'password.noWhiteSpaces': 'Password should not contain white spaces',
        'password.onlyLatinCharacters': 'Password should contain only latin characters',
    }),
})

export { registerValidation }