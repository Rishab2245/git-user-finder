import React from 'react'
import "./star.css"
import "./Repo.css"

const star = ({users}) => {



  return (
    <>
    {
    users.map((user,idx)=>(
        <div key={idx} className="repocard stared">
        <div>
        <a href={user.html_url} target='_blank'>
           <h1>{user.full_name}</h1> 
        </a>
        </div>
        <div>
        <a href={user.owner.html_url} target='_blank'><p>owner : {user.owner.login}</p></a>     
        </div>
        </div>
       


    ))
    }</>
  )
}

export default star