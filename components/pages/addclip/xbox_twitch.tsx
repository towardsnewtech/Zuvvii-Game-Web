import * as React from 'react'
import twitch from "public/assets/ic_twitch.png";
import xbox from "public/assets/ic_xbox_live.png";
import Image from 'next/image'
import tagStyled from 'styled-components'
import { InputAdornment, Tooltip } from '@mui/material';
import { useMutation, useQuery } from 'react-query';
import http from 'services/http-common';
import { useRouter } from 'next/router';
import { IXboxVideo } from 'types/xbox';
import { StyledButton, StyledTextField } from 'shared/styled';
import { ITwitchVideo } from 'types/twitch';
import { toast } from 'react-toastify';
import Masonry from 'react-masonry-css';
import { IVideoData } from 'types/interfaces';

const breakpointColumnsObj = {
    default: 3,
    1460: 2,
    1046: 1,
};

interface IXboxTwitch {
    type: number
    handleSelectVideo: (videoData: any) => void
}

const XBoxTwitch = ({
    type,
    handleSelectVideo
}: IXboxTwitch) => {
    const router = useRouter()
    const [searchUserName, setSearchUserName] = React.useState('')
    const [twitchKey, setTwitchKey] = React.useState(null)
    const [xboxClips, setxboxClips] = React.useState(null)

    const handleSubmit = async () => {
        if(type == 1) {
            const res: any = await http.get(`/ExtVidServices/twitchkey/${searchUserName}`)
            if(res.err) {
                toast.error('Please, try it later')
                return
            }
            setTwitchKey(res.data)
        } else if (type == 0) {
            getXboxClips.mutate()
        }
    }

    const onSelectClip = (videoData: any) => {
        let thumbnailUrl: string = "" ;
        let videoUrl: string = "" ;

        if(type == 0) {
            thumbnailUrl = videoData.thumbnails.find((thumb: any) => thumb.thumbnailType === "Large")?.uri ||
                videoData.thumbnails[0].uri ||
                videoData.gameClipUris.find((clip: any) => clip.uriType === "Thumbnail_Small")
                    ?.uri
            videoUrl = videoData.gameClipUris.find((clip: any) => clip.uriType === "Download")
                ?.uri
        } else if (type == 1) {
            thumbnailUrl = videoData.thumbnail_url
            videoUrl = `${videoData.thumbnail_url.slice(
                0,
                videoData.thumbnail_url.length - 20
            )}.mp4`
        }
       
        handleSelectVideo({
            thumbnailUrl,
            videoUrl
        })
    }

    const getXboxClips: any = useMutation({
        mutationFn: async () => {
            const res: any = await http.get(`${router.basePath}/xboxVideos/${searchUserName}`)
    
            if(res.err) {
                throw (res.err.response.data)
            }
    
            setxboxClips(res.data)
            return res.data
        }
    })


    const getTwitchClips: any = useQuery(
        ['getTwitchClips', twitchKey],
        () => {
            
            return http.get(`/ExtVidServices/twitchclips/${twitchKey}`)
        },
        {
            refetchOnWindowFocus: false,
            cacheTime: Infinity,
        }
    )

    const twitchClips: ITwitchVideo[] | null = React.useMemo(() => {
        return  getTwitchClips.data ?
                getTwitchClips.data.data ?
                getTwitchClips.data.data.data
                    : null
                    : null
    }, [getTwitchClips.data]);

    return (
        <>
            <Selector>
                <StyledTextField
                    placeholder={`Enter ${type == 0 ? 'xbox' : 'twitch'} user name`}
                    value={searchUserName}
                    onChange={(e) => setSearchUserName(e.target.value)}
                    sx={{
                        background: 'black',
                        color: 'white'
                    }}
                    InputProps={{
                        endAdornment: <InputAdornment position="end" sx={{cursor : 'pointer'}}>
                            { type == 0 ? <Image src={xbox.src} width={30} height={30} alt='not found image' />
                            : <Image src={twitch.src} width={30} height={30} alt='not found image' /> }
                        </InputAdornment>,
                      }}
                />
                <StyledButton
                    sx={{
                        pt: 1.5,
                        pb: 1.5,
                        pl: 2,
                        pr: 2
                    }}
                    onClick={handleSubmit}
                >
                    Submit
                </StyledButton>
            </Selector>
            <VideoGrid>
            { type == 1 && twitchClips && <Masonry 
                    breakpointCols={breakpointColumnsObj}
                    className="card_list"
                    columnClassName="card_list_column"
                >
                {twitchClips?.map((item: ITwitchVideo, index) => (
                    <div style={{
                            position: 'relative',
                            width: '70%',
                            height: 220,
                            cursor: 'pointer'
                        }}
                        key={index}
                        onClick={() => onSelectClip(item)}
                    >
                        <Image  alt='not found image' fill src={item.thumbnail_url} />
                    </div>
                ))}
            </Masonry> }
            </VideoGrid>
        </>
    )
}

export default XBoxTwitch

const VideoGrid = tagStyled.div`
  padding-top: 4rem;

  width: 100%;

  & .card_list {
    display: -webkit-box; /* Not needed if autoprefixing */
    display: -ms-flexbox; /* Not needed if autoprefixing */
    display: flex;
    width: auto;
  }

  & .card_list_column {
    display: flex;
    flex-direction : column;
    gap: 2rem;
    align-items: center;
    width: 70% !important;
    margin: 0px auto !important;
  }
`
const Selector = tagStyled.div`
    display: flex;
    gap: 1rem;
    align-items: center;

    background: rgba(101,98,98,0.46);
    padding: 0.5rem;
    padding-left: 1rem;
    padding-right: 1rem;
    border-radius: 0.25rem;
`