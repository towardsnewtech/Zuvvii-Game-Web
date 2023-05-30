import UploadForm from 'modules/Upload'
import { useAppSelector } from 'store/hooks'
import * as React from 'react'
import { useAppDispatch } from 'store/hooks'
import tagStyled from 'styled-components'
import { fetchGames } from 'store/slices/game.slice'
import {  MenuItem, Select, Typography } from "@mui/material";
import { IGame, IVideoData } from 'types/interfaces'
import { useStyles } from 'shared/styled'
import RichTextEditor from 'shared/core/RichTextEditor'
import { useMutation, useQueryClient } from 'react-query'
import http from 'services/http-common'
import { LoadingButton } from '@mui/lab'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import XBoxTwitch from './xbox_twitch'

const AddLocallyXbox = () => {
    const classes = useStyles()
    const queryClient = useQueryClient()

    const typeList = ["Gallery", "xBox", "Twitch"]

    const account = useAppSelector((state) => state.auth.account)
    const games = useAppSelector(state => state.game.games)

    const router = useRouter()

    const [selectedType, setSelectedType] = React.useState(0)
    const [uploadedVideo, setUploadedVideo] = React.useState<any | null>()
    const [step, setStep] = React.useState(0)
    const [game, setGame] = React.useState(0);
    const [editorText, setEditorText] = React.useState('')

    const dispatch = useAppDispatch()

    const uploadFileCallSuccess = (videoData: any) => {
        setUploadedVideo(videoData)
        setStep(1)
    }

    const goToBack = () => {
        if(step == 0) return 
        setStep(step-1)
    }

    const goToNext = () => {
        if(step == 1) return
        setStep(step+1)
    }

    const postVideo = useMutation({
        mutationFn: async (payload: any) => {
            const res: any = await http.post(`/items`, {
              ...payload
            })
    
            if(res.err) {
                throw (res.err.response.data)
            }
    
            queryClient.invalidateQueries('getHomeVideos')
    
            console.log(res)

            return 
        }
    })

    const handlePost = async () => {
        if(games) {
            const payload = {
                text: editorText,
                description: editorText,
                userId: account?.id,
                gameName: games[game].name,
                gameId: games[game].id,
                published: true,
                thumbUrl: uploadedVideo?.thumbnailUrl,
                videoUrl: uploadedVideo?.videoUrl
            };

            await postVideo.mutateAsync(payload)

            toast.success('Video Post Successfully!')

            router.push('/home')
        }
    }

    React.useEffect(() => {
        if(!games) dispatch(fetchGames())
    }, [games, dispatch])

    React.useEffect(() => {
        setUploadedVideo(null)
    }, [selectedType])

    return (
        <AddLocallyXboxLayout>
            <StepController>
                { step && <StepLabel onClick={goToBack}>Back</StepLabel> }
                { uploadedVideo && <StepLabel onClick={goToNext}>Next</StepLabel> }
            </StepController>
            {step == 0 && <>
                <ClipSelector>
                    {typeList.map((type, index) => (
                        <ClipType key={index} className={selectedType == index ? 'active' : ''} onClick={() => setSelectedType(index)}>{type}</ClipType>
                    ))}
                </ClipSelector>
                {!selectedType && <UploadForm
                    key={'upload_form_clip'}
                    apiEndpoint={`/items/upload`}
                    onAPICallSuccess={uploadFileCallSuccess}
                />}
                {selectedType && <XBoxTwitch 
                    type={selectedType - 1}
                    handleSelectVideo={setUploadedVideo}
                />}
            </>}
            {step == 1 && <>
                <GameSelector>
                    {games && <Select
                        placeholder="Choose a game"
                        sx={{
                            backgroundColor: "#313131",
                            color: "white",
                            mt: 5,
                            "& svg": {
                                color: 'white'
                            }
                        }}
                        MenuProps={{
                            className : classes.selectPaper
                        }}
                        value={game}
                        onChange={(event) => setGame(+event.target.value)}
                        renderValue={(selected) => {
                            return games[selected].name;
                        }}
                    >
                        {games.map((game: IGame, index: number) => (
                            <MenuItem value={index} key={index} sx={{ color: "black" }}>
                            {game.name}
                            </MenuItem>
                        ))}
                    </Select>}
                </GameSelector>
                <RichTextEditor
                    name='content'
                    placeholder="Write your description"
                    content={editorText}
                    onChange={text => setEditorText(text)}
                    // onLinkAdded={handleLinkAdded}
                    hookToForm
                    toolbarConfig={{
                        actions: {
                        // onImageClick: !isLoading ? openPicker : () => {}
                        },
                        showPasteButton: true,
                        hideToolbarWhenNoContent: false
                    }}
                />

                <LoadingButton
                    sx={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        width: '10rem',
                        alignSelf: 'flex-end',
                        mr: '10%',
                        mt: 5,
                        color: 'black',
                        background: '#76CCB7',
                        "&:hover": {
                            background: '#76CCB7'
                        }
                    }}
                    onClick={handlePost}
                >
                    Post
                </LoadingButton>
            </>}
        </AddLocallyXboxLayout>
    )
}

export default AddLocallyXbox

const AddLocallyXboxLayout = tagStyled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    padding-top: 5rem;
`
const StepController = tagStyled.div`
    display: flex;
    justify-content: space-between;
    width: 80%;
`

const StepLabel = tagStyled.p`
    margin: 0px;
    padding: 0px;
    color: #76CCB7;
    font-size: 1.5rem;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
        color: white;
    }

    font-family: poppins;
`

const ClipSelector = tagStyled.div`
    margin-top: 2rem;
    margin-bottom: 3rem;

    display: flex;
    justify-content: space-between;

    gap: 1rem;
    background: rgba(101, 98, 98, 0.46);
    border-radius: 2rem;

    padding: 0.5rem 2rem;
`

const ClipType = tagStyled.p`
    font-size: 1.2rem;
    
    padding: 0px;
    margin: 0px;

    color: white;
    width: 10rem;
    text-align: center;
    font-family: poppins;

    &.active {
        color: #76CCB7;
    }

    &:hover {
        color: #76CCB7;
    }

    transition: 0.3s;
    cursor: pointer;
`

const GameSelector = tagStyled.div`
    display: flex;
    justify-content: flex-start;
    width: 80%;
`