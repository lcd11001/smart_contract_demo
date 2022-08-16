import styles from '../styles/Home.module.css'
import * as API from '../utils'

import SearchBar from '../components/search_bar'
import VideoList from '../components/video_list'
import VideoDetail from '../components/video_detail'
import { useState } from 'react'


const App = () =>
{
    const [selectedVideo, SetSelectedVideo] = useState(null)
    const { data, isError, isLoading } = API.getVideos(
        { q: 'surfboards', maxResults: 10 },
        (data, key, config) =>
        {
            SetSelectedVideo(data.items[0])
        }
    )

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
        <div>
            <SearchBar />
            <VideoDetail video={selectedVideo} />
            <VideoList videos={data.items} onVideoSelected={SetSelectedVideo} />
        </div>
    )
}

export default App