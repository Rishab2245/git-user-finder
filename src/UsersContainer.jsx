import "./UserContainer.css"
import { Link } from "react-router-dom"

export const UsersContainer = ({users}) => {
  return (
    <div className="allusers">
        {users && users.map((user,idx) => user.login && (
            <div key={idx} className="userprofile">
                <img src={user.avatar_url} />
                <h1>{user.login}</h1>
                <h1 className="name">{user.name}</h1>

                <Link to={`/${user.login}`}><span>view</span></Link>
            </div>
        ))
        
    }
    </div>
  )
}
