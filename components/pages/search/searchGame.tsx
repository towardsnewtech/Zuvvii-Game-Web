import * as React from 'react'
import tagStyled from 'styled-components'
import brandImage from 'public/assets/search/brand.png'
import handPhoneImage from 'public/assets/search/handphone.png'
import Image from 'next/image'
import { useQuery, useQueryClient } from 'react-query'
import http from 'services/http-common'
import { IGame, IVideo } from 'types/interfaces'
import Media from 'shared/core/Media'
import Masonry from "react-masonry-css";

interface ISearchGame {
    searchKey: string
}


const breakpointColumnsObj = {
    default: 2,
    1450: 1,
};

const SearchGame = ({
    searchKey
}: ISearchGame) => {
    const getTrendigGames: any = useQuery(
        ['getTrendingGames', searchKey],
        () => {
            return http.get(`/discover/trending`)
        },
        {
            refetchOnWindowFocus: false,
            cacheTime: Infinity,
        }
    )

    const trendingGames: IVideo[] | null = React.useMemo(() => {
        return  getTrendigGames.data ?
                getTrendigGames.data.data
                : null
    }, [getTrendigGames.data]);

    const getGames: any = useQuery(
        ['getGames', searchKey],
        () => {
            return http.get(`/discover/searchgames?searchTerm=${searchKey}`)
        },
        {
            refetchOnWindowFocus: false,
            cacheTime: Infinity,
        }
    )

    const games: IGame[] | null = React.useMemo(() => {
        return  getGames.data ?
                getGames.data.data
                : null
    }, [getGames.data]);

    return (
        <SearchGameLayout>
            <BrandLayout>
                <Backlay>
                    <Image src={brandImage.src} alt='not found image' fill />
                    <Letter>
                        <LineText>THIS IS YOUR CHANCE TO SHAPE.</LineText>
                        <LineText>THE PLATFORM THAT YOU USE.</LineText>
                        <LineText>SHARE YOUR FEEDBACK ON.  <span style={{color: '#402365'}}>DISCORD!</span></LineText>
                    </Letter>
                    <Overlay>
                        <Image src={handPhoneImage.src} alt='not found image' fill />
                    </Overlay>
                </Backlay>
            </BrandLayout>
            { games && games.length && <List>
                <SectionTitle>Games</SectionTitle>
                { games.slice(0, 3).map((game) => (
                        <Card key={`${game.id}-game`} >
                            <Image fill alt='no image' src={game.image} />
                        </Card>
                ))}
            </List>}
            <List>
                <SectionTitle>Trending Clips</SectionTitle>
                
                { trendingGames 
                    && <Masonry
                        breakpointCols={breakpointColumnsObj}
                        className="home_card_list"
                        columnClassName="home_card_list_column"
                    >
                    {trendingGames.slice(0, 3).map((game) => (
                        <Media  
                            key={`${game.id}-trending`}
                            size='cover'
                            isRemoveable={false}
                            isProcessing={false}
                            link={game.videoUrl}
                            type={'video'}
                            videoProps={{
                                width: '90%',
                            }}
                        />
                    ))}
                    </Masonry> 
                }
            </List>
        </SearchGameLayout>
    )
}

export default SearchGame

const SectionTitle = tagStyled.p`
    color: white;
    font-size: 2rem;
    font-weight: bold;
    font-family: poppins;
`

const Card = tagStyled.div`
    width: 350px;
    height: 250px;
    position: relative;
    border-radius: 0.5rem;
    overflow: hidden;
`
const List = tagStyled.div`
    display: flex;
    flex-direction: column;

    padding-left: 2rem;
    padding-top: 2rem;
    padding-bottom: 2rem;

    & .home_card_list {
        display: -webkit-box; /* Not needed if autoprefixing */
        display: -ms-flexbox; /* Not needed if autoprefixing */
        display: flex;
    }

    & .home_card_list_column {
        /* change div to reference your elements you put in <Masonry> */
        display: flex;
        flex-direction : column;
        align-items: center;
        width: 70% !important;
        margin: 0px auto !important;
        gap: 3rem;
    }
`

const LineText = tagStyled.p`
    margin: 0px;
    padding: 0px;
    color: white;
    padding-bottom: 0.5rem;
    font-size: 1.5rem;
    font-family: poppins;
`
const Letter = tagStyled.div`
    padding-left: 2rem;
    padding-bottom: 2rem;

    position: absolute;
`
const Overlay = tagStyled.div`
    position: absolute;
    width: 900px;
    height: 100%;
    right: 0px;
    bottom: 0px;
`

const Backlay = tagStyled.div`
    height: 600px;
    width: 1400px;
    position: relative;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-end;
    
    @media screen and (max-width: 1630px) {
        width: 100%;
    }
`
const BrandLayout = tagStyled.div`
    width: 100%;

    display: flex;
    justify-content: center;
`
const SearchGameLayout = tagStyled.div`
    padding-top: 2rem;
`