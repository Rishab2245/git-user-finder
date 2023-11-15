export default function Tabs({type,settType}){
  return (
    <>
        <button onClick={()=>settType("repos")} className={`${type === "repos" && "click"}`}> Repositories </button>
        <button onClick={()=>settType("starred")} className={`${type === "starred" && "click"}`}>Starred</button>
        <button onClick={()=>settType("followers")} className={`${type === "followers" && "click"}`}>followers</button>
        <button onClick={()=>settType("orgs")} className={`${type === "orgs" && "click"}`}>Organisation</button>
    </>
  )
}
