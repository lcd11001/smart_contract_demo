import useSWR from "swr"

const fetcher = (...args) => fetch(...args).then(res => res.json())

export const getVideos = () =>
{
    const { data, error } = useSWR('api/youtube', fetcher)

    return {
        data,
        isLoading: !error && !data,
        isError: error
    }
}