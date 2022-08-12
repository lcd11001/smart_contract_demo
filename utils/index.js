import useSWR from "swr"

const fetcher = (...args) => fetch(...args).then(res => res.json())

export const getVideos = (jsonParams) =>
{
    const params = Object.entries(jsonParams || {})
        .reduce((arr, [key, value]) =>
        {
            return arr.concat(`${key}=${value}`)
        }, [])
        .join('&')

    const { data, error } = useSWR(`api/youtube?${params}`, fetcher)

    return {
        data,
        isLoading: !error && !data,
        isError: error || data?.hasOwnProperty('error')
    }
}