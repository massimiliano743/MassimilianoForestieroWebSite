module.exports = {
    webpack: {
        configure: (webpackConfig) => {
            const oneOfRule = webpackConfig.module.rules.find(r => Array.isArray(r.oneOf));
            if (oneOfRule) {
                const oneOf = oneOfRule.oneOf;
                // Evita duplicati se già presente
                const already = oneOf.some(r => r.test && r.test.toString().includes('less'));
                if (!already) {
                    // Inserisco prima dell'ultimo elemento (fallback asset) => di solito l'ultimo ha no 'exclude' ma solo asset/resource
                    const fallbackIndex = oneOf.length - 1;
                    const lessRule = {
                        test: /\.less$/i,
                        use: [
                            require.resolve('style-loader'),
                            {
                                loader: require.resolve('css-loader'),
                                options: {importLoaders: 1}
                            },
                            {
                                loader: require.resolve('less-loader'),
                                options: {
                                    lessOptions: {
                                        javascriptEnabled: true
                                    }
                                }
                            }
                        ],
                        sideEffects: true // permette l'import come side-effect globale
                    };
                    oneOf.splice(fallbackIndex, 0, lessRule);
                }
            }
            return webpackConfig;
        }
    }
};
