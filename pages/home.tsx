
import * as React from 'react'

import { GetServerSideProps, NextPage } from 'next'

import { dehydrate, QueryClient } from 'react-query'

import http from 'services/http-common'
import Layout from 'components/layout';
import VideoObserver from 'components/pages/home/VideoObserver';

const Home: NextPage = () => {
  return (
    <Layout pageTitle='HOME - ZUVVII GAMING' type='base'>
      <VideoObserver />
    </Layout>
  )
};

export const getServerSideProps: GetServerSideProps<any> =
  async () => {
    const queryClient = new QueryClient()
    const per_page = 21
    const take = 7

    const fetchHomeVideos = async (page: number) => {
      const response: any = await http.get(
        `/items/homefeed/${page * per_page}/${take}`
      )
      return {
        result: response.data?.TopClips
      }
    }
  
    await queryClient.prefetchInfiniteQuery({
      queryKey: 'getHomeVideos',
      queryFn: ({ pageParam = 1 }) => fetchHomeVideos(pageParam),
      getNextPageParam: (lastPage, allPages) => {
        const nextPage: number = allPages?.length + 1
        return lastPage.result?.length === per_page ? nextPage : undefined
      }
    })

    return {
      props: {
        dehydratedState: JSON.parse(
          JSON.stringify(dehydrate(queryClient))
        )
      }
    }
}

export default Home;