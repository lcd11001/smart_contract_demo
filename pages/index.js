import styles from '../styles/Home.module.css'
import * as API from '../utils'

import SearchBar from '../components/search_bar'
import VideoList from '../components/video_list'

const App = () =>
{
    const { data, isError, isLoading } = API.getVideos({ q: 'surfboards', maxResults: 10 })

    return (
        <div>
            <SearchBar />
            {
                data && <VideoList videos={data.items} />
            }

        </div>
    )
}

export default App