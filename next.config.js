module.exports = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'flagcdn.com',
                port: '', // пусто, если порт не используется явно (обычно 443 для https)
                pathname: '/**', // все пути
            },
        ],
    },
};