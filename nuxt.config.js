const webpack = require('webpack');
const parser = require('body-parser')
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    /*
    ** Headers of the page
    */
    head: {
        title: 'DevWars',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            {
                hid: 'description',
                name: 'description',
                content: 'DevWars is a live game show where web developers compete against each other in 60 minute coding challenges. Join our educational and entertaining platform of experienced and aspiring members.'
            },
            { name: 'google-site-verification', content: 'RLFyk9dzTQTWw10KYT1_-C3uMy4Itz26Har6xRbv_Co' },
            { name: "og:title", content: "Esports for Developers - DevWars" },
            { name: "og:image", content: "https://devwars.tv/og/logo.jpeg" },
            {
                name: "og:description",
                content: "DevWars is a live game show where web developers compete against each other in 60 minute coding challenges. Join our educational and entertaining platform of experienced and aspiring members."
            }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            {
                rel: 'stylesheet',
                href: 'https://fonts.googleapis.com/css?family=Montserrat:400,700|Roboto:300,400,500,700'
            },
            {
                rel: 'stylesheet',
                href: 'https://pro.fontawesome.com/releases/v5.0.8/css/all.css',
                integrity: 'sha384-OGsxOZf8qnUumoWWSmTqXMPSNI9URpNYN35fXDb5Cv5jT6OR673ah1e5q+9xKTq6',
                crossorigin: 'anonymous'
            },
        ]
    },


    serverMiddleware: [
        { path: '/mail/translate', handler: parser.json({ limit: '5mb' }) },
        { path: '/mail/translate', handler: '~/mail/index.js' },
    ],

    debug: true,
    /*
    ** Customize the progress bar color
    */
    loading: { color: '#ff007d' },

    axios: {
        baseURL: 'http://localhost:3030/',
        browserBaseURL: 'http://localhost:3030/',
        credentials: true
    },

    css: [
        '~/assets/scss/main.scss',
        'webui-popover/src/jquery.webui-popover.css',
        'vue2-animate/dist/vue2-animate.css',
        'cropperjs/dist/cropper.css',
        'flatpickr/dist/flatpickr.css'
    ],

    plugins: [
        { src: '~plugins/ga.js', ssr: false },
        { src: '~/plugins/popover', ssr: false },
        '~/plugins/directives',
        '~/plugins/axios',
        '~/plugins/filters',
        '~/plugins/modal'
    ],

    modules: [
        '@nuxtjs/axios'
    ],

    router: {
        linkExactActiveClass: 'active',
        middleware: ['pending']

    },

    /*
    ** Build configuration
    */
    build:
        {
            babel: {
                plugins: ['transform-decorators-legacy', 'transform-class-properties', 'transform-flow-strip-types'],
                presets: ['stage-0']
            },

            plugins: [
                new webpack.ProvidePlugin({
                    '$': 'jquery',
                    'Popper': 'popper.js',
                }),
                new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
            ],
            /*
            ** Run ESLint on save
            */
            extend(config, { isDev, isClient }) {
                const vueLoader = config.module.rules.find((rule) => rule.loader === 'vue-loader');
                vueLoader.options.transformToRequire['mj-image'] = ['src'];
                vueLoader.options.transformToRequire['mg-include'] = ['path'];

                if (isDev && isClient) {
                    config.module.rules.push({
                        test: /\.(mjml)$/,
                        loader: 'mjml-loader',
                    });
                }
            }
        }
}
;
