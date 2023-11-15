import React from 'react';
import "./Repo.css"

const Repo = ({users}) => {
  return (
    <>
    
    {
    users.map((user,idx)=>(
        <div key={idx} className="repocard">
        <a href={user.html_url} target="_blank">
            {user.full_name}
        </a>
        
        <div>
            <p>{'🟢' + user.language}</p>
            <p> forks :{user.forks}</p>
            <p> Stars :{user.stargazers_count}</p>
            <p> watchers :{user.watchers}</p>
        </div>


        </div>


    ))
    }
    </>
  )
}

export default Repo;