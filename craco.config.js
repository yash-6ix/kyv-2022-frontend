const path = require('path');

const aliases = (prefix = './src') => ({
    '@components': `${prefix}/components`,
    '@services': `${prefix}/services`,
    '@util': `${prefix}/util`,
    '@hooks': `${prefix}/hooks`,
});

const resolvedAliases = Object.fromEntries(
    Object.entries(aliases).map(([key, value]) => [
        key,
        path.resolve(__dirname, value),
    ])
);

// craco.config.js
module.exports = {
    style: {
        postcss: {
            plugins: [require('tailwindcss'), require('autoprefixer')],
        },
    },
    webpack: {
        alias: resolvedAliases,
    },
};
