import styles from '../styles/Home.module.css'
import * as API from '../utils'

import SearchBar from '../components/search_bar'
import VideoList from '../components/video_list'
import VideoDetail from '../components/video_detail'


const App = () =>
{
    const { data, isError, isLoading } = API.getVideos({ q: 'surfboards', maxResults: 10 })

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
            <VideoDetail video={data.items[0]} />
            <VideoList videos={data.items} />
        </div>
    )
}

export default App