import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import "./UserInfo.css"
import axios from 'axios';

export  default function Userinfo() {
  const [user,setuser] = useState([])
    const {pathname} = useLocation();
    const navigate = useNavigate();
    let baseurl = "https://api.github.com/users";

    async function GetUserInfo(){
      const res = await axios.get(baseurl + pathname);
      const data = res.data;
      setuser(()=>[data]);
    }

    useEffect(() => {
      GetUserInfo();
    console.log(user);
    },[pathname])




  return (

    <div className='userinfo'>
      <button className='back' onClick={()=>navigate('/')}>
        BACK
      </button>
      {
        user && user.map((uinfo ,i )=>(
          <div key={i} className='datail'>
              <img src={uinfo.avatar_url} alt="profilePicture" />
              <div>
                <h1>{uinfo.name}</h1>
                <p><span>Login_name</span> : {uinfo.login}</p>
                <p><span>Followers</span> : {uinfo.followers}</p>
                <p><span>Following</span> : {uinfo.following}</p>
                <p><span>public_gists</span> : {uinfo.public_gists}</p>
                <p><span>public_repos</span> : {uinfo.public_repos}</p>
                <p><span>Location</span> : {uinfo.location}</p>
                <p><span>Bio</span> : {uinfo.bio}</p>
                <p><span>Join</span> : {new Date(uinfo.created_at).toLocaleDateString()}</p>
                <a className='back' href={uinfo.html_url} target='_blank'>
        Visit
      </a>

              </div>
          </div>
        ))
      }
      <div className='bar'>
        <button>Repositories</button>
        <button>Activity</button>
        <button>followers</button>
      </div>
    
      </div>
  )
}
