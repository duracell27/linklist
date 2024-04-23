/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                hostname: '*.googleusercontent.com'
            },{
                hostname: 'link-list-files-shmidt.s3.amazonaws.com'
            }
        ]
    }
};

export default nextConfig;
