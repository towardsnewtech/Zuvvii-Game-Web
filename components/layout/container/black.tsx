import React from 'react'
import Head from 'next/head'
import { ILayout } from '../types'
import tagStyled from 'styled-components'
import Sidebar from '../partial/sidebar'

// const changeActivePage = () => {
//   window.scrollTo({ top: 0, behavior: 'smooth' })
// }

function BlackLayout({ children, pageTitle, showMeta }: ILayout) {
  return (
    <Layout>
       <Head>
        <title>{pageTitle}</title>
      </Head>
      <Sidebar />
      <Content>
        {children}
      </Content>
    </Layout>
  )
}

export default BlackLayout

const Layout = tagStyled.div`
  background-color : black;
  max-width : 100vw;
  min-height : 100vh;
  display: flex;
  overflow-x: hidden;
  overflow-y: hidden;

  & .MuiListItem-root {
      margin-bottom : 40px;
      display : flex;
      gap : 20px;
      align-items: center;
  }
`
const Content = tagStyled.div`
    width: 100vw;
    margin-left: 240px; 
`;
