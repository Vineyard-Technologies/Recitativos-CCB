module.exports = function(api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            [
                'module-resolver',
                {
                    root: ['./src'],
                    alias: {
                        '@types': './src/@types',
                        '@images': './src/images',
                        '@components': './src/components',
                        '@contexts': './src/contexts',
                        '@routes': './src/routes',
                        '@screens': './src/screens',
                        '@storage': './src/storage',
                        '@styles': './src/styles',
                        '@utils': './src/utils',
                    }
                }
            ]
        ]
    };
};
