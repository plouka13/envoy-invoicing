import React from 'react'
import TeamMemberTable from './TeamMemberTable'

const TeamContent = (props) => {
  return (
    <React.Fragment>
      <TeamMemberTable teamName={props.teamName} membersList={props.membersList} reloadTeamList={props.reloadTeamList} teamFunctions={props.teamFunctions} />
    </React.Fragment>
  )
}

export default TeamContent