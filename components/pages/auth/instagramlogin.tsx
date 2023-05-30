import React from 'react';
// import InstagramLogin from 'react-instagram-login';
import Icon from 'shared/core/Icon';
import tagStyled from 'styled-components'

const clientId = "5fd2f11482844c5eba963747a5f34556"

const Instagram = () => {
    const responseInstagram = (response: any) => {
        console.log(response);
    }

    return (
        <InstagramButton>
            {/* <InstagramLogin
                clientId={clientId}
                onSuccess={responseInstagram}
                onFailure={responseInstagram}
                buttonText={""}
                type='button'
            >
                <Icon name='instagram' rounded={true}  color='purple' bgColor="white" raw/>
            </InstagramLogin> */}
        </InstagramButton>
    )
}

export default Instagram

const InstagramButton = tagStyled.div`
    button {
        background: white !important;
        width: 40px !important;
        height: 40px !important;
        padding: 0px !important;
        margin: 0px !important;
        border-radius: 50% !important;
    }
`