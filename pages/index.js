import useSWR from 'swr'
import styles from '../styles/Home.module.css'
import * as API from '../utils'

import SearchBar from '../components/search_bar'

const App = () =>
{
  const {data, isError, isLoading} = API.getVideos({ q: 'surfboards', maxResults: 10 })

  return (
    <div>
      <SearchBar />
    </div>
  )
}

export default App