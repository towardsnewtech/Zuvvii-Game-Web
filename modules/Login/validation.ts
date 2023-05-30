import JoiBase from 'joi'
import { fileListExtension } from 'joi-filelist'
import { joiPasswordExtendCore } from 'joi-password'
const joiPassword = JoiBase.extend(joiPasswordExtendCore);

const loginValidation = joiPassword.object({
  username : joiPassword.string()
  .required()
  .messages({
    'any.empty' : "⚠ Username is Required",
    "any.required" : "⚠ Username is Required",
    'string.empty' : "⚠ Username is Required",
    'string.required' : "⚠ Username is Required"
  }),
  password: joiPassword
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
})

export { loginValidation }