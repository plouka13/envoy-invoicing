import React from 'react'
import './ProfileTop.css'
import UserAvatar from './UserAvatar'

const ProfileTop = (props) => {
    const AvatarSize = "15vh"
    return (
        <div className='profile'>
            <div className='profileCover'>
                <UserAvatar fontSize={"8vh"} width={AvatarSize} height={AvatarSize} userProfileState={props.userProfileState} />
            </div>
        </div>
    )
}

export default ProfileTop