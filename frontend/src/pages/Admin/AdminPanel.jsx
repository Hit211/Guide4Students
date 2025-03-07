import {Link} from "react-router-dom";
const AdminPanel = () => {
  return (
    <div>
      <div>
        <h1>Welcome Admin</h1>
      </div>
      <div>
        <Link to="services">
         <h1>Path to the Services</h1>
        </Link>
      </div>
    </div>
  )
}

export default AdminPanel