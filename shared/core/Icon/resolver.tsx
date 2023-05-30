import { AiFillHeart, AiOutlinePlus, AiFillInstagram, AiOutlineLink, AiOutlineClose, AiOutlineBold } from 'react-icons/ai'
import { MdArrowBackIosNew, MdOutlinePersonOutline, MdFormatListBulleted } from 'react-icons/md'
import { SlHome } from 'react-icons/sl'
import { BiSearch, BiDownload } from 'react-icons/bi'
import { FiLogOut, FiItalic } from 'react-icons/fi'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { BsThreeDotsVertical, BsTwitter, BsInstagram, BsDiscord, BsChevronRight, BsChevronLeft } from 'react-icons/bs'
import { FaComment, FaRegComment, FaShare, FaHeading, FaBold, FaItalic } from 'react-icons/fa'
import { TfiFacebook } from 'react-icons/tfi'
import { RiWhatsappFill } from 'react-icons/ri'
import { GiPhotoCamera } from 'react-icons/gi'
import { CgDetailsMore } from 'react-icons/cg'
import { RxHeading } from 'react-icons/rx'
import { TbHeading } from 'react-icons/tb'
import { HiOutlineClipboardDocumentList } from 'react-icons/hi2'
// TODO: move custom icons to dedicated dir, this file will only map and plug them
export const Icons = {
  fillHeart: AiFillHeart,
  backarrow: MdArrowBackIosNew,
  home:SlHome,
  search: BiSearch,
  notify: IoMdNotificationsOutline,
  plus: AiOutlinePlus,
  person: MdOutlinePersonOutline,
  vThreeDot : BsThreeDotsVertical,
  comment: FaComment,
  share: FaShare,
  twitter: BsTwitter,
  facebook: TfiFacebook,
  instagram : BsInstagram,
  logout: FiLogOut,
  whatsapp: RiWhatsappFill,
  discord: BsDiscord,
  download: BiDownload,
  ailink: AiOutlineLink,
  close: AiOutlineClose,
  capture: GiPhotoCamera,
  pasteClipboard: HiOutlineClipboardDocumentList,
  ['arrow-head-left']: BsChevronLeft,
  ['arrow-head-right']: BsChevronRight,
  'options-expand': CgDetailsMore,
  'heading-1': FaHeading,
  'heading-2': TbHeading,
  bold: AiOutlineBold,
  italic: FiItalic,
  image: () => (
    <svg
      width='32'
      height='32'
      viewBox='0 0 32 32'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M19.8016 25H10.5329C9.92712 25 9.62421 25 9.48395 24.8802C9.36224 24.7763 9.29765 24.6203 9.31021 24.4608C9.32468 24.2769 9.53887 24.0627 9.96725 23.6343L18.4702 15.1314C18.8662 14.7354 19.0642 14.5373 19.2925 14.4632C19.4934 14.3979 19.7097 14.3979 19.9106 14.4632C20.1389 14.5373 20.3369 14.7354 20.7329 15.1314L24.6016 19V20.2M19.8016 25C21.4817 25 22.3218 25 22.9635 24.673C23.528 24.3854 23.987 23.9265 24.2746 23.362C24.6016 22.7202 24.6016 21.8802 24.6016 20.2M19.8016 25H11.4016C9.7214 25 8.88133 25 8.23959 24.673C7.6751 24.3854 7.21616 23.9265 6.92854 23.362C6.60156 22.7202 6.60156 21.8802 6.60156 20.2V11.8C6.60156 10.1198 6.60156 9.27976 6.92854 8.63803C7.21616 8.07354 7.6751 7.6146 8.23959 7.32698C8.88133 7 9.72141 7 11.4016 7H19.8016C21.4817 7 22.3218 7 22.9635 7.32698C23.528 7.6146 23.987 8.07354 24.2746 8.63803C24.6016 9.27976 24.6016 10.1198 24.6016 11.8V20.2M14.1016 12.5C14.1016 13.6046 13.2061 14.5 12.1016 14.5C10.997 14.5 10.1016 13.6046 10.1016 12.5C10.1016 11.3954 10.997 10.5 12.1016 10.5C13.2061 10.5 14.1016 11.3954 14.1016 12.5Z'
        stroke='#98A2B3'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  ),
  'bullet-list': MdFormatListBulleted,
}
