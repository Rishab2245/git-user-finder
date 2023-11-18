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
           <h1>{user.name}</h1> 
        </a>
       <a href="#"> <p>owner : {user.full_name}</p></a>
        
        </div>
    ))
    }</>
  )
}

export default Star