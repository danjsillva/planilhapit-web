import styled from 'styled-components'

import Colors from './colors'

export const Input = styled.input`
    border: solid 1px ${Colors.base};
    border-radius: 5px;
    padding: 8px 16px;
    margin: 8px;
`

export const Button = styled.button`
    background: transparent;
    border: solid 1px ${Colors.base};
    border-radius: 5px;
    padding: 8px 16px;
    margin: 8px;
    cursor: pointer;

    &:hover {
        background: ${Colors.light};
    }

    &:active {
        background: ${Colors.base};
    }
`
