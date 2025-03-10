import { useParams } from "react-router"

 import Development from '../Development/Development';

const MainPage = () => {
    const {id} = useParams();
  return (
    <div>
        {id==="67a4639b88f6b24a7e7c0268"?
        <Development/> : ""    
    }
    </div>
  )
}

export default MainPage