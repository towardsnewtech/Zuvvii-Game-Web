import * as React from 'react'
import { useQuery } from 'react-query'
import http from 'services/http-common'
import { useAppSelector } from 'store/hooks'

const AllClips = () => {
    const account = useAppSelector(
        state => state.auth.account
    )

    const getAllClips: any = useQuery(
        ['getAllClips', account],
        () => {
            return http.get(`/ExtVidServices/GetVideoServices/${account?.id}`)
        },
        {
            refetchOnWindowFocus: false,
            cacheTime: Infinity
        }
    )

    const allVideos: any | null = React.useMemo(() => {
        return  getAllClips.data ?
                getAllClips.data.data
                : []
    }, [getAllClips.data])

    return (
        <>
            These are all clips.
        </>
    )
}

export default AllClips