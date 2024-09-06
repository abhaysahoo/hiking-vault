/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                pathname: '/a/**',
            },
            {
                protocol: 'https',
                hostname: '*.s3.*.amazonaws.com', // Allow all AWS S3 buckets
                pathname: '/**', // Allow any path
            },
        ],
    },
};

export default nextConfig;
