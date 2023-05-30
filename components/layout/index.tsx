import BaseLayout from './container/base'
import BlackLayout from './container/black'
import MiniLayout from './container/mini'
import SingleLayout from './container/single'
import { ILayout } from './types'

const layoutContainers = {
  base: BaseLayout,
  mini: MiniLayout,
  single: SingleLayout,
  black: BlackLayout
  // if needed - add more layout containers here
}

interface ILayoutFactory extends ILayout {
  type: keyof typeof layoutContainers
}

function Layout({
  children,
  pageTitle,
  type,
  showMeta
}: ILayoutFactory) {
  const Container = layoutContainers[type]

  return (
    <Container pageTitle={pageTitle} showMeta={showMeta}>
      {children}
    </Container>
  )
}

export default Layout
