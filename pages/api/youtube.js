export default function handler(req, res)
{
    console.log('api/youtube', req)
    res.status(200).json({ key: process.env.API_KEY })
}