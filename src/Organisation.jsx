import React from 'react'

const Organisation = ({users}) => {
  return (
   <>
    {
    users.map((user,idx)=>(
        <div key={idx} className="repocard">
        <a href="#">
            {user.login}
        </a>     
        </div>


    ))
    }</>
  )
}

export default Organisation
