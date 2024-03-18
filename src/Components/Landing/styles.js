import LoginImage from '../../assets/LoginImage.jpg'
import SignupImage from '../../assets/SignupImage.jpg'

export const cardDimensions = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '600px',
    width: '550px',
    borderRadius: '20px',
    marginRight: '10vw',
    marginLeft: '10vw',
}

export const backgroundDivSignup = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: `url(${SignupImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    width: '100vw',
    backgroundPosition: 'top',
}

export const backgroundDivLogin = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: `url(${LoginImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    width: '100vw',
    backgroundPosition: 'top',
}

export const logoDarkDimensions = {
    width: 120,
    height: 'auto',
    marginBottom: '5vh'
}

export const boxFlex = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
}