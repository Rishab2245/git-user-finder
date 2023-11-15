import { useEffect, useRef, useState } from "react"
import axios from "axios";
import { UsersContainer } from "../UsersContainer";
import "./Users.css"
import Loading from "../Loading";

export default function Users(){
    const [users,setusers] = useState([]);
    const [loading,setloading] = useState(null);
    let baseurl = "https://api.github.com/users"

    const user = useRef('');

    async function AllUsers(){
        setloading(true);
        const res = await axios.get(baseurl);
        const data = res.data;
        console.log(data);
       setusers(data);
       setloading(null);
    
    }
    async function finduser(){
        setloading(true);
      if(user.current.value!== ''){
        setusers("");
        const res = await axios.get(baseurl+"/"+user.current.value);
        const data = res.data;
        setusers(()=>[data]);
        user.current.value = "";
      }
      else{
        AllUsers();
      }
      setloading(null);
    }
    async function finduser2(){
        setloading(true);
        if(user.current.value!== ''){
          setusers("");
          const res = await axios.get(baseurl+"/"+user.current.value);
          const data = res.data;
          setusers(()=>[data]);
        }
        else{
          AllUsers();
        }
      setloading(null);
    }

    function submit(e){
      e.preventDefault();
      finduser();
    }
    let timer;
   function debouncefunc(){

  clearInterval(timer);
   timer = setTimeout(()=>{
      finduser2()
      console.log("1");
  },700)
  
   }


    useEffect(() =>{
        AllUsers();
    },[setusers])

    return <div>
        <div className="searcharea">
         <form onSubmit={submit}>
         <input type="text" placeholder="Search github username.."  onChange={debouncefunc}   ref={user}/>
            <button onClick={finduser}>Search</button>
         </form>
        </div>
        { loading ? <Loading /> :  <UsersContainer users={users}/>}
    </div>
}
