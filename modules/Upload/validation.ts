import JoiBase from 'joi'
import { fileListExtension } from 'joi-filelist'

const Joi = fileListExtension(JoiBase)

const allowSingleVideoFile = (value: string, helper: any) => {
  const files = Array.from(value)

  let foundVideos = 0

  files.map((file: any) => {
    if (file.type.search('video') >= 0) foundVideos++
  })

  if (foundVideos > 1) {
    helper.message('Only 1 video file is allowed')
    return false
  }

  return value
}

const checkThumbnail = (value: File, helper: any) => {
  if(!value) {
    return helper.message('Please, capture thumbnail for media')
  }

  return value
}
// min 17 characters, because its being used in richTextEditor and 7 characters are for html tag
const uploadValidation = Joi.object({
  media: Joi.filelist()
    .optional()
    .maxSize(1024 * 1024 * 15)
    .max(10)
    .custom(allowSingleVideoFile)
    .messages({
      'filelist.maxsize':
        'Only files of size less than 15mb are allowed',
      'filelist.max': 'Only upto 10 files are allowed'
    }),
  media_thumbnail: Joi.any()
    .optional()
    .custom(checkThumbnail)
})

export { uploadValidation }
