const colors = require('tailwindcss/colors');

module.exports = {
    content: [
        './pages/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './components/**/**/*.{ts,tsx}',
        './layouts/**/*.{ts,tsx}',
        './lib/**/*.{ts,tsx}'
    ],
    theme: {
        fontFamily: {
            roboto: ['Roboto', 'Verdana', 'Raleway', 'PingFang SC', 'Microsoft Yahei', 'sans-serif']
        },
        extend: {
            colors: {
                primary: colors.teal,
                gray: colors.trueGray
            },
            typography: (theme) => ({
                DEFAULT: {
                    css: {
                        color: theme('colors.gray.700'),
                        a: {
                            textDecoration: 'none',
                            position: 'relative',
                            color: theme('colors.blue.500'),
                            '&:hover': {
                                color: theme('colors.blue.600')
                            },
                            code: { color: theme('colors.blue.400') }
                        },
                        h1: {
                            fontWeight: '700',
                            letterSpacing: theme('letterSpacing.tight'),
                            color: theme('colors.gray.900')
                        },
                        h2: {
                            fontWeight: '700',
                            letterSpacing: theme('letterSpacing.tight'),
                            color: theme('colors.gray.900')
                        },
                        h3: {
                            fontWeight: '600',
                            color: theme('colors.gray.900')
                        },
                        'h4,h5,h6': {
                            color: theme('colors.gray.900')
                        },
                        pre: {
                            padding: 0,
                            borderRadius: '15px'
                        },
                        figure: {
                            margin: 0,
                            figcaption: {
                                margin: 0
                            }
                        },
                        'code:before': {
                            content: 'none'
                        },
                        'code:after': {
                            content: 'none'
                        },
                        details: {
                            backgroundColor: theme('colors.gray.100'),
                            paddingLeft: '4px',
                            paddingRight: '4px',
                            paddingTop: '2px',
                            paddingBottom: '2px',
                            borderRadius: '0.25rem'
                        },
                        hr: { borderColor: theme('colors.gray.200') },
                        'ol li:before': {
                            fontWeight: '600',
                            color: theme('colors.gray.500')
                        },
                        'ul li:before': {
                            backgroundColor: theme('colors.gray.500')
                        },
                        '.contains-task-list li:before': {
                            backgroundColor: 'transparent',
                            content: 'none !important'
                        },
                        'ul li *:last-child': {
                            marginTop: 0,
                            marginBottom: 0
                        },
                        strong: { color: theme('colors.gray.600') },
                        blockquote: {
                            color: theme('colors.gray.900'),
                            borderLeftColor: theme('colors.gray.200')
                        },
                        table: {
                            textAlign: 'left',
                            borderCollapse: 'collapse',
                            border: '1px solid #6cf'
                        },
                        'table th': {
                            padding: '20px 10px !important',
                            fontWeight: 'normal',
                            color: '#039',
                            textTransform: 'uppercase',
                            borderRight: '1px solid #0865c2',
                            borderTop: '1px solid #0865c2',
                            borderLeft: '1px solid #0865c2',
                            borderBottom: '1px dashed #0865c2'
                        },
                        'table td': {
                            padding: '20px 10px !important',
                            color: '#669',
                            borderRight: '1px dashed #6cf'
                        }
                    }
                },
                dark: {
                    css: {
                        color: theme('colors.gray.300'),
                        a: {
                            textDecoration: 'none',
                            color: theme('colors.primary.500'),
                            '&:hover': {
                                color: theme('colors.primary.400')
                            },
                            code: { color: theme('colors.primary.400') }
                        },
                        h1: {
                            fontWeight: '700',
                            letterSpacing: theme('letterSpacing.tight'),
                            color: theme('colors.gray.100')
                        },
                        h2: {
                            fontWeight: '700',
                            letterSpacing: theme('letterSpacing.tight'),
                            color: theme('colors.gray.100')
                        },
                        h3: {
                            fontWeight: '600',
                            color: theme('colors.gray.100')
                        },
                        'h4,h5,h6': {
                            color: theme('colors.gray.100')
                        },
                        pre: {
                            padding: 0,
                            borderRadius: '15px'
                        },
                        figure: {
                            margin: 0,
                            figcaption: {
                                margin: 0
                            }
                        },
                        'code:before': {
                            content: 'none'
                        },
                        'code:after': {
                            content: 'none'
                        },
                        details: {
                            backgroundColor: theme('colors.gray.800')
                        },
                        hr: { borderColor: theme('colors.gray.700') },
                        'ol li:before': {
                            fontWeight: '600',
                            color: theme('colors.gray.400')
                        },
                        'ul li:before': {
                            backgroundColor: theme('colors.gray.400')
                        },
                        strong: { color: theme('colors.gray.100') },
                        thead: {
                            color: theme('colors.gray.100')
                        },
                        tbody: {
                            tr: {
                                borderBottomColor: theme('colors.gray.700')
                            }
                        },
                        blockquote: {
                            color: theme('colors.gray.100'),
                            borderLeftColor: theme('colors.gray.700')
                        }
                    }
                }
            })
        }
    },
    plugins: [require('@tailwindcss/typography'), require('@tailwindcss/line-clamp')]
};
