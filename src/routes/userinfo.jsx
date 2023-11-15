import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import "./UserInfo.css"
import axios from 'axios';
import Tabs from '../Tabs';
import Repo from '../Repo';
import Star from '../Star';
import { UsersContainer } from '../UsersContainer';
import Organisation from '../organisation';

export  default function Userinfo() {
  const [user,setuser] = useState([]);
  const [type,settType] = useState("repos");
  const [infos, setinfos] = useState([]);
  const [maxla,setmaxla] = useState("");



    const {pathname} = useLocation();
    const navigate = useNavigate();
    let baseurl = "https://api.github.com/users";

    async function GetUserInfo(){
      const res = await axios.get(baseurl + pathname);
      const data = res.data;
      setuser(()=>[data]);
    }

      async function GetUrls(){
        const res = await axios.get(baseurl + pathname + `/${type}`);
        const data = res.data;
        setinfos(data);
        console.log(baseurl + pathname + `/${type}`);
        console.log(data);
        if(type=='repos'){
          maximumlang();
        }
     

      }
      const maximumlang = async () =>{
        let infos=await axios.get(baseurl + pathname + "/repos");
        infos = infos.data;
      let list = new Map();
      let info=infos.map((e)=>(
          e.language
      ));
      info.forEach(element => {
        if(list.has(element)){
         list .set(element,list.get(element) + 1)
        }
        else{
          list.set(element,1);
        
        }
      });

      let max = [...list].sort((a,b)=>(
        b[1]-a[1]
      ));
      console.log(max);
      console.log(max[0][0]);
if(max[0][0]==null){
  setmaxla(max[1][0]);
}
else{
  setmaxla(max[0][0]);
}
      
    }  



    useEffect(() => {
      GetUserInfo();
      GetUrls();
    
      
    },[pathname,type])

    useEffect(() => {

    maximumlang();
      
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
                <p><span>Most Used Language</span> : {maxla}</p>
                <p><span>Join</span> : {new Date(uinfo.created_at).toLocaleDateString()}</p>
                <div>
                <a className='back' href={uinfo.html_url} target='_blank'>
        Visit
      </a>
                <a className='twitter' href={`https://twitter.com/${uinfo.twitter_username}`} target='_blank'>
        Twitter
      </a>
                </div>
              

              </div>
          </div>
        ))
      }
      <div className='bar'>
        <Tabs type={type} settType={settType}/>
      </div>
      {type === "repos" && (
        <div className='repos'>
          {infos && <Repo users = {infos} />}
        </div>
      )}
      {type === "starred" && (
        <div>

        {infos && <Star users = {infos} />}
        </div>
      )}
      {type === "followers" && (
        <div>
      <UsersContainer users={infos}/>
        </div>
      )}
       {type === "orgs" && (
        <div>
        {infos && <Organisation users = {infos} />}
        </div>
      )}
    
      </div>
  )
}
