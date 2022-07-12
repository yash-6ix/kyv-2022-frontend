// tailwind.config.js
module.exports = {
    purge: [],
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        fontFamily: {
            heading: 'Poynter',
            title: ['Masqualero'],
            body: 'Pragmatica',
        },
        extend: {
            spacing: {
                112: '28rem',
                128: '32rem',
                144: '36rem',
                168: '42rem',
                192: '48rem',
                224: '56rem',
                256: '64rem',
                ['1/8']: '12.5%',
                headerHeight: 'clamp(64px, 10vw, 96px)',
            },
            colors: {
                brand: {
                    black: '#051101',
                    white: '#FFFFFF',
                    lightBlue: '#F5F7FD',
                    bronze: {
                        50: '#FBF5EF',
                        400: '#D99C5F',
                        500: '#CF8335',
                        600: '#A76828',
                    },
                    olive: {
                        900: '#0B2801',
                        800: '#195A02',
                        700: '#268B03',
                        600: '#34BD05',
                        500: '#42EF06',
                        50: '#E5FEDC',
                        25: '#F8FFF5',
                    },
                    neutral: {
                        900: '#1A1A1A',
                        800: '#333333',
                        700: '#4D4D4D',
                        600: '#4D4D4D',
                        500: '#808080',
                        400: '#999999',
                        300: '#B2B2B2',
                        200: '#CCCCCC',
                        100: '#E5E5E5',
                        50: '#F2F2F2',
                        25: '#F8F8F8',
                    },
                    NDP: {
                        500: '#F58220',
                        50: '#FFA82B',
                    },
                    Conservative: {
                        500: '#466FC0',
                        50: '#466FC0',
                    },
                    Liberal: {
                        500: '#D91920',
                        50: '#E7625F',
                    },
                    BlocQ: {
                        500: '#5A8FB2',
                        50: '#466FC0',
                    },
                    PPC: {
                        500: '#876AD1',
                        50: '#876AD1',
                    },
                    Green: {
                        500: '#5FA503',
                        50: '#8FC24B',
                    },
                    Independent: {
                        500: '#807F7F',
                        50: '#807F7F',
                    },
                },
            },
            boxShadow: {
                in: 'inset 4px 4px 8px 0 rgba(0, 0, 0, 0.1)',
            },
        },
    },
    variants: {
        extend: {
            backgroundColor: ['active'],
            textColor: ['active'],
            border: ['active'],
            borderWidth: ['active'],
            scale: ['active'],
            outline: ['focus-visible'],
            ringWidth: ['focus-visible'],
        },
    },
    plugins: [],
};
