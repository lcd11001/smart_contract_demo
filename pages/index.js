import useSWR from 'swr'
import styles from '../styles/Home.module.css'
import { getVideos } from '../utils'
import MyApp from './_app'



const App = (props) =>
{
  console.log('props', props)
  return (
    <div>Hi! {props.name}</div>
  )
}

export default function Home()
{
  const { data, isLoading, isError } = getVideos()

  if (isError)
  {
    return (
      <div className={styles.container}>
        error: {isError}
      </div>
    )
  }

  if (isLoading)
  {
    return (
      <div className={styles.container}>
        loading...
      </div>
    )
  }
  return (
    <div className={styles.container}>
      <App name={data.key} />
    </div>
  )
}
