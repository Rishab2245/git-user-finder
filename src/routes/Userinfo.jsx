import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import "./Userinfo.css"
import axios from 'axios';
import Tabs from '../Tabs';
import Repo from '../Repo';
import Star from '../Star';
import UserContainer from '../UserContainer';
import Organisation from '../Organisation';

export  default function Userinfo() {
  const [user,setuser] = useState([]);
  const [type,settType] = useState("repos");
  const [infos, setinfos] = useState([]);
  const [maxla,setmaxla] = useState("");
  const[page,setpage] = useState(0);
  const[len,setlen] = useState(0);




  function prev() {
    if (page - 1 != -1) {
      console.log("",page);
      setpage((previous)=>(previous - 1));
      

      GetUrls()
      
    }
  }
   function next() {
if (page < ((len/6))) {
  console.log(page);
  setpage((forword)=>(forword + 1));
  GetUrls()
  
    
  }
   }

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
        setlen(data.length);
        let start = page * 6;
        let end = start + 6;
        let temp = data.slice(start, end);
        if (temp!=null){
          setinfos(temp);
        }
       
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
if(max[0][0]==null){
  setmaxla(max[1][0]);
}
else{
  setmaxla(max[0][0]);
}
      
    }  



    useEffect(() => {
      setpage(0);
      GetUserInfo();
      GetUrls();
    
      
    },[pathname,type])

    useEffect(() => {

    maximumlang();
      
    },[pathname])


    useEffect(() => {

  GetUrls();
      
    },[page])




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
                <p className='bio'><span>Bio</span> : {uinfo.bio}</p>
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
      <UserContainer users={infos}/>
        </div>
      )}
       {type === "orgs" && (
        <div>
        {infos && <Organisation users = {infos} />}
        </div>
      )}
      <div className='bar '>
      <button className='pagenation' onClick={prev}>back</button>
      <button className='pagenation' onClick={next}>next</button>
      </div>
      </div>
  )
}
