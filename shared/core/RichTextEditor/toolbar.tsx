import { useActive, useCommands } from '@remirror/react'
import React from 'react'
import Icon from '../Icon'
import tagStyled from 'styled-components'

export interface IRichTextEditorCustomToolBarActions {
  onHeader1Click?: () => any
  onHeader2Click?: () => any
  onBoldClick?: () => any
  onItalicClick?: () => any
  onLinkClick?: () => any
  onImageClick?: () => any
  onBulletListClick?: () => any
  onPasteClick?: () => any
  // onAttachmentClick?: () => any
}

interface IRichTextEditorCustomToolBar
  extends IRichTextEditorCustomToolBarActions {
  id: string
}

function RichTextEditorCustomToolBar({
  id,
  onHeader1Click,
  onHeader2Click,
  onBoldClick,
  onItalicClick,
  onLinkClick,
  onImageClick,
  onBulletListClick,
  onPasteClick
}: // onAttachmentClick
IRichTextEditorCustomToolBar) {
  const {
    focus,
    toggleBold,
    toggleItalic,
    removeLink,
    selectLink,
    toggleHeading,
    toggleBulletList,
  } = useCommands()
  const active = useActive()

  return (
    <ToolbarLayout id={id} >
      
      <Icon 
        name='heading-1' 
        onClick={() => {
          toggleHeading({ level: 1 })
          focus()
          onHeader1Click && onHeader1Click()
        }}
        bgColor='#65C5BA'
        color='black'
      />

      <Icon 
        name='heading-2'
        onClick={() => {
          toggleHeading({ level: 2 })
          focus()
          onHeader2Click && onHeader2Click()
        }}
        bgColor='#65C5BA'
        color='black'
      />

      <Icon 
        name='bold'
        onClick={() => {
          toggleBold()
          focus()
          onBoldClick && onBoldClick()
        }}
        bgColor='#65C5BA'
        color='black'
      />

      <Icon 
        name='italic'
        onClick={() => {
          toggleItalic()
          focus()
          onItalicClick && onItalicClick()
        }}
        bgColor='#65C5BA'
        color='black'
      />

      <Icon 
        name='pasteClipboard'
        onClick={() => {
          focus()
          onPasteClick && onPasteClick()
        }}
        bgColor='#65C5BA'
        color='black'
      />
      {/* <Icon 
        name='ailink'
        onClick={() => {
          active.link() ? removeLink() : selectLink()
          focus()
          onLinkClick && onLinkClick()
        }}
        bgColor='#65C5BA'
        color='black'
      /> */}
      
      <Icon 
        name='bullet-list'
        onClick={() => {
          toggleBulletList()
          focus()
          onBulletListClick && onBulletListClick()
        }}
        bgColor='#65C5BA'
        color='black'
      />
    </ToolbarLayout>
  )
}

export default RichTextEditorCustomToolBar

const ToolbarLayout = tagStyled.div`
  display: flex;
  gap: 0.5rem;
`
