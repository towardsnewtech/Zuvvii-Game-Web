import * as React from 'react'
import { NextPage } from 'next'

import HomeVideoList from "components/pages/home/VideoList";

import { useInfiniteQuery} from 'react-query'

import Masonry from "react-masonry-css";
import tagStyled from "styled-components";

import http from 'services/http-common'
import SingleLoading from 'components/common/SingleLoading';

const breakpointColumnsObj = {
  default: 1,
  1460: 1,
  1046: 1,
};

const VideoObserver: NextPage = () => {
  const per_page = 21
  const take = 7
  const observerElem = React.useRef(null)
  
  const fetchHomeVideos = async (page: number) => {
    const response: any = await http.get(
      `/items/homefeed/${page * per_page}/${take}`
    )
    return {
      result: response.data?.TopClips
    }
  }

  const {
    data,
    isSuccess,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    'getHomeVideos',
    ({ pageParam = 1 }) => fetchHomeVideos(pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        const nextPage: number = allPages?.length + 1
        return lastPage.result?.length == per_page ? nextPage : undefined
      }
    }
  )

  const handleObserver = React.useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries
      if (target.isIntersecting && hasNextPage) {
        fetchNextPage()
      }
    },
    [fetchNextPage, hasNextPage]
  )

  React.useEffect(() => {
    if (!observerElem.current) return

    const element: HTMLDivElement = observerElem.current
    const option = { threshold: 0 }

    const observer = new IntersectionObserver(handleObserver, option)
    observer.observe(element)
    return () => observer.unobserve(element)
  }, [fetchNextPage, hasNextPage, handleObserver])


  return (
    <React.Fragment>
      <HomeVideoListLayout>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="home_card_list"
          columnClassName="home_card_list_column"
        >
          {
            isSuccess &&
              data &&
              data.pages &&
              data.pages.map(
                (page, index) => (
                  page &&
                  page.result &&
                  <HomeVideoList videos={page.result} key={index} />
                ) 
              )
              
          }
          </Masonry>
      </HomeVideoListLayout>
      {hasNextPage && (
        <LoadingDesc
          ref={observerElem}
        >
          {!isFetchingNextPage ? (
            'Load more news...'
          ) : (
            <SingleLoading 
              type='spin'
              size={40}
            />
          )}
        </LoadingDesc>
      )}
    </React.Fragment>
  );
};

export default VideoObserver;

const HomeVideoListLayout = tagStyled.div`
  width : calc(100vw - 270px);

  & .home_card_list {
    display: -webkit-box; /* Not needed if autoprefixing */
    display: -ms-flexbox; /* Not needed if autoprefixing */
    display: flex;
    width: auto;
  }

  & .home_card_list_column {
    /* change div to reference your elements you put in <Masonry> */
    display: flex;
    flex-direction : column;
    align-items: center;
    width: 70% !important;
    margin: 0px auto !important;
  }
`;

const LoadingDesc = tagStyled.div`
  color: white;
`