import * as React from 'react'
import FacebookLogin from 'react-facebook-login';
import Icon from 'shared/core/Icon';
import tagStyled from 'styled-components'

const Facebook = () => {
    const responseFacebook = (response: any) => {
        console.log(response);
    }

    return (
        <FacebookButton>
            <FacebookLogin
                appId="1088597931155576"
                autoLoad={true}
                fields="name,email,picture"
                callback={responseFacebook}
                textButton={''}
                icon={<Icon name='facebook' color='#1877F2' bgColor="white" rounded={true} raw />}
                size={'small'}
            />
        </FacebookButton>
    )
}

export default Facebook

const FacebookButton = tagStyled.div`
    button {
        border: none !important;
        padding: 0px !important;
        margin: 0px !important;
        width: 40px;
        height: 40px;
        border-radius: 50% !important;
        background: white !important;
    }
`