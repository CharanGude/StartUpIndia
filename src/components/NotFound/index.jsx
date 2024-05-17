import notFound from '../../assets/notFound.jpg';
import {useNavigate} from "react-router-dom"
import './index.css'

const NotFound = () => {
  const navigate = useNavigate()
  const goToHome = () => {
    navigate('/')
  }
  return(
  <div>
    <button className="button" onClick={goToHome}>Go To Home</button>
    <div className="cont">
    <img className="image" src={notFound} alt="not-found" />
  </div>
    
  </div>
  
)}

export default NotFound