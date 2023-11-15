import "./UserContainer.css"
import { Link } from "react-router-dom"
import "./routes/Userinfo.css"

export default function UsersContainer({users}){
  return (
    <div className="allusers">
        {users && users.map((user,idx) => user.login && (
            <div key={idx} className="userprofile">
                <img src={user.avatar_url} />
                <h1>{user.login}</h1>
                <h1 className="name">{user.name}</h1>

                <Link to={`/${user.login}`}><span className="back">view</span></Link>
            </div>
        ))
        
    }
    </div>
  )
}
