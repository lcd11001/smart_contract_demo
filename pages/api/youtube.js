import YTSearch from 'youtube-api-v3-search'

export default function handler(req, res)
{
    const query = req.query;
    // console.log('api/youtube', query)
    YTSearch(process.env.YOUTUBE_SEARCH_API_KEY, query, (error, response) =>
    {
        // console.log('error', error)
        // console.log('response', JSON.stringify(response, null, 2))
        if (error)
        {
            res.status(400).json({ error: error || 'unknown reason' })
        }
        else
        {
            if (response.error)
            {
                res.status(response.error.code || 400).json({ error: response.error.errors[0] || 'unknown reason' })
            }
            else
            {
                res.status(200).json(response)
            }
        }
    })
}