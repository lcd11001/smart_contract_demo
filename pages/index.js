import styles from '../styles/Home.module.css'
import * as API from '../utils'

import SearchBar from '../components/search_bar'
import VideoList from '../components/video_list'
import VideoDetail from '../components/video_detail'
import { useEffect, useState } from 'react'


const App = () =>
{
    const [selectedVideo, SetSelectedVideo] = useState(null)
    const [videos, SetVideos] = useState([])
    const [term, SetTerm] = useState({})

    const { data, isError, isLoading } = API.getVideos(
        term,
        (data, key, config) =>
        {
            SetSelectedVideo(data.items[0])
            SetVideos(data.items)
        }
    )

    useEffect(() =>
    {
        videoSearch('surfboards')
    }, [])

    const videoSearch = (term) =>
    {
        SetTerm({
            q: term,
            maxResults: 10
        })
    }

    if (isLoading)
    {
        return (
            <div>loading...</div>
        )
    }

    if (isError)
    {
        return (
            <div>error</div>
        )
    }

    return (
        <div className={styles.main}>
            <div className={styles.grid}>
                <div className={styles.itemTop}>
                    <SearchBar defaultValue={term.q} onSearchChanged={videoSearch} />
                </div>
                <div className={styles.itemLeft}>
                    <VideoDetail video={selectedVideo} />
                </div>
                <div className={styles.itemRight}>
                    <VideoList videos={videos} onVideoSelected={SetSelectedVideo} />
                </div>
            </div>
        </div>
    )
}

export default App