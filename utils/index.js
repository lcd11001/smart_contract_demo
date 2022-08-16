import useSWR from "swr"

const fetcher = (...args) => fetch(...args).then(res => res.json())

export const getVideos = (jsonParams = {}, resolve = null, reject = null) =>
{
    const params = Object.entries(jsonParams)
        .reduce((arr, [key, value]) =>
        {
            return arr.concat(`${key}=${value}`)
        }, [])
        .join('&')

    const { data, error } = useSWR(params.length > 0 ? `api/youtube?${params}` : null, fetcher, {
        onSuccess: (data, key, config) => resolve && resolve(data, key, config),
        onError: (err, key, config) => reject && reject(err, key, config)
    })

    return {
        data,
        isLoading: !error && !data,
        isError: error || data?.hasOwnProperty('error')
    }
}