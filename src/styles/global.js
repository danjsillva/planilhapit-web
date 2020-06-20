import { createGlobalStyle } from 'styled-components'

import Colors from './colors'

export const GlobalStyle = createGlobalStyle`
    * {
        font-family: 'Exo 2', sans-serif !important;
        color: ${Colors.dark};
        margin: 0;
        padding: 0;
        border: none;
        outline: none;
    }
`