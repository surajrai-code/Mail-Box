import { useSelector, useDispatch } from "react-redux";
import {replacemail, updateMail} from '../../store/MailAction';

const Home =() =>{
    const dispatch = useDispatch()
    const isLoggedIn =useSelector(state=>state.auth.isLoggedin);
    const firstTime = useSelector(state=>state.mail.firstTime);
    const currentMail = useSelector(state=>state.mail.mailData);

    if(isLoggedIn && firstTime){
      const loggedEmail = localStorage.getItem('email');
      const emailUrl = loggedEmail;
     dispatch(replacemail(emailUrl , loggedEmail));
    }
    
    setInterval(()=>{
        if(isLoggedIn){
          const loggedEmail = localStorage.getItem('email');
          const emailUrl = loggedEmail;
          dispatch(updateMail(emailUrl , loggedEmail , currentMail));
        }
      } , 2000);

    return(
        <h1>Welcome to Mail box</h1>
    )

}
export default Home;