module.exports = {
    presets: ['module:@react-native/babel-preset'],
    plugins: [
        ['react-native-auto-route/plugin', { appDirectory: 'src' }],
        ['nativewind/babel'],   
        ['module-resolver',
            {
                root: ['.'],
                extensions: [".ios.js", ".android.js", ".ios.jsx", ".android.jsx", ".js", ".jsx", ".json", ".ts", ".tsx"],
                alias: {
                    '@': './src',
                    '@/assets': './assets',
                },
            },
        ],
        ['react-native-reanimated/plugin'],
    ],
};  