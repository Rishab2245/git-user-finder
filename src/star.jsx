import React from 'react'
import "./Star.css"
import "./Repo.css"

const Star = ({users}) => {



  return (
    <>
    {
    users.map((user,idx)=>(
        <div key={idx} className="repocard stared">
        
        <a href={user.html_url} target='_blank'>
           <h1>{user.full_name}</h1> 
        </a>
        <p>owner : {user.full_name.split('/')[0]}</p>
        
        </div>
       


    ))
    }</>
  )
}

export default Star