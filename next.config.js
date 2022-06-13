module.exports = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/show',
                permanent: true
            }
        ]
    }
}