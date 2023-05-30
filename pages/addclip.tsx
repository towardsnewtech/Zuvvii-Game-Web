
import * as React from 'react'

import { NextPage } from 'next'

import Layout from 'components/layout';
import AddLocallyXbox from 'components/pages/addclip/add_locally_xbox';

const AddClip: NextPage = () => {
  return (
    <Layout pageTitle='ADD CLIP - ZUVVII GAMING' type='black'>
        <AddLocallyXbox />
    </Layout>
  )
};

export default AddClip;