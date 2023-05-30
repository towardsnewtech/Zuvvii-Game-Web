import {
  EditorComponent,
  Remirror,
  useRemirror
} from '@remirror/react'
import React, {
  Children,
  ReactNode,
  useEffect,
  useRef,
  useState
} from 'react'
import { useFormContext } from 'react-hook-form'
import { prosemirrorNodeToHtml } from 'remirror'
import {
  BoldExtension,
  BulletListExtension,
  HardBreakExtension,
  HeadingExtension,
  ItalicExtension,
  LinkExtension,
  ImageExtension
} from 'remirror/extensions'
import 'remirror/styles/all.css'
import { readTextFromClipboard } from 'shared/helper/utils'
import Icon from '../Icon'
import FloatingLinkEditor from './floatingLinkEditor'
import styles from './index.module.css'
import RichTextEditorCustomToolBar, {
  IRichTextEditorCustomToolBarActions
} from './toolbar'

import tagStyled from 'styled-components'
import { StyledButton } from 'shared/styled'

interface IRichTextEditorCustomToolBar {
  actions?: IRichTextEditorCustomToolBarActions
  showPasteButton?: boolean
  hideToolbarWhenNoContent?: boolean
}

interface IRichTextEditor {
  content?: string
  id?: string
  name?: string
  placeholder?: string
  isReply?: boolean
  hookToForm?: boolean
  onChange?: (text: string) => void
  onLinkAdded?: (text: string) => void
  children?: ReactNode
  toolbarConfig?: IRichTextEditorCustomToolBar
  className?: string
}

function RichTextEditor({
  id,
  name,
  placeholder,
  content,
  isReply,
  hookToForm,
  onChange,
  onLinkAdded,
  children,
  toolbarConfig,
  className
}: IRichTextEditor) {
  const [isRegistered, setIsRegistered] = useState<boolean>()
  const [toolbarId, setToolbarId] = useState<string | undefined>()
  const [editorContents, setEditorContents] = useState<
    string | undefined
  >('')
  const formContext = useFormContext()
  const lastLinkRef = useRef<string>()
  const [isToolBarHidden, setIsToolBarHidden] =
    useState<boolean>(true)

  const isFullyHooked = name && hookToForm && formContext

  const fieldError =
    isFullyHooked && formContext?.formState?.errors?.[name]?.message

  const { manager, state, getContext } = useRemirror({
    extensions: () => [
      new HeadingExtension(),
      new BoldExtension(),
      new ItalicExtension(),
      new LinkExtension({ autoLink: true }),
      new BulletListExtension({ enableSpine: true }),
      new HardBreakExtension(),
      new ImageExtension({ enableResizing: true })
    ],
    content: isFullyHooked ? formContext.getValues(name) : '',
    selection: 'start',
    stringHandler: 'html'
  })

  const onTextChange = async (text: string) => {
    setEditorContents(text)

    let strippedString = text.replace(/(<([^>]+)>)/gi, '')
    if (isFullyHooked) {
      formContext.setValue(name, strippedString)
      if (text !== '<p></p>') {
        // '<p></p>'.length === 7 ~ this is auto added by prosemirror
        formContext.trigger([name])
      }
    }

    // fire the change callback
    onChange && (await onChange(text))

    let links = []

    const parser = new DOMParser()
    const doc = parser.parseFromString(text, 'text/html')
    const imgElements = doc.getElementsByTagName('a')
    for (let i = 0; i < imgElements.length; i++) {
      const imgElement = imgElements[i]
      links.push(imgElement.getAttribute('href'))
    }

    if (
      lastLinkRef.current &&
      !links?.includes(lastLinkRef.current)
    ) {
      lastLinkRef.current = undefined
      onLinkAdded && (await onLinkAdded(''))
    }

    // if text has a new link, fire the link added callback
    if (
      links &&
      links.length > 0 &&
      onLinkAdded &&
      lastLinkRef.current !== links.at(-1)
    ) {
      lastLinkRef.current = links.at(-1) as string
      await onLinkAdded(lastLinkRef.current)
    }
  }

  const dismissFieldError = () => {
    if (isFullyHooked) formContext.clearErrors(name)
  }

  const pasteTextFromClipboard = async () => {
    const text = await readTextFromClipboard()

    // paste into editor
    const stateX = getContext()?.getState() as any
    getContext()?.setContent(
      stateX?.applyTransaction(stateX.tr.insertText(text))
        .state as any
    )

    // trigger change callback
    await onTextChange(
      prosemirrorNodeToHtml(getContext()?.getState().doc as any)
    )
  }

  const getTextLength = () => {
    const placeholderHTMLLength = 7 // '<p></p>'.length === 7 ~ this is auto added by prosemirror
    return (editorContents?.length || 0) - placeholderHTMLLength || 0
  }

  const areChildrenValid =
    children && Children.toArray(children).filter(Boolean).length > 0

  useEffect(() => {
    const uniqueInstanceID = Math.floor(Math.random() * 10988625741)
    setToolbarId(`toolbar-${uniqueInstanceID}`)
  }, [])

  // Register the form initially
  useEffect(() => {
    if (isFullyHooked && !isRegistered) {
      formContext.register(name)
      setIsRegistered(true)
    }
  }, [formContext, isRegistered, isFullyHooked, name])

  return (
    <TextEditor>
      {toolbarId && (
        <div
          {...(id && { htmlFor: id })}
        >
          {/* Text box of editor */}
          <Remirror
            manager={manager}
            initialContent={state}
            onChange={event => {
              onTextChange(prosemirrorNodeToHtml(event.state.doc))
            }}
            classNames={['remirror-content']}
            placeholder={placeholder}
            onBlur={dismissFieldError}
          >
            <EditorComponent />
            {/* <FloatingLinkEditor /> */}

            {/* Footer section of editor with custom toolbar and paste content btn */}
            <Footer>
              <ToolbarIcons>
                <Icon
                  name={
                    isToolBarHidden
                      ? 'options-expand'
                      : 'arrow-head-left'
                  }
                  color='white'
                  onClick={() => setIsToolBarHidden(x => !x)}
                />
                { !isToolBarHidden &&  <RichTextEditorCustomToolBar
                  id={toolbarId}
                  {...toolbarConfig?.actions}
                  onPasteClick={pasteTextFromClipboard}
                />}
                
              </ToolbarIcons>
            </Footer>
          </Remirror>
          {isFullyHooked && fieldError && (
            <p>
              {fieldError as string}
            </p>
          )}
        </div>
      )}
    </TextEditor>
  )
}

RichTextEditor.defaultProps = {
  placeholder: ''
}

export default RichTextEditor

const TextEditor = tagStyled.div`
  width: 80%;
  margin-top: 2rem;

  & .remirror-content {
    padding: 1rem;
    outline: none;
    color: white;
    border: 1px solid #313131;
    border-radius: 0.5rem;
  }
`

const Footer = tagStyled.div`
  display: flex;
  gap: 2rem;
  justify-content: space-between;
  align-items: center;
`

const ToolbarIcons = tagStyled.div`
  padding-top: 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`