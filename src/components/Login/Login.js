import logo from "../../assets/logo.png";
import "./Login.css";
import circleBg from "../../assets/circles_bg.png";
import dummyImg from "../../assets/login-dummy-img.png";
import google from "../../assets/google.png";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const googleSign = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(async (result) => {
      try {
        if (result.user) {
          // window.location.href = "/home";
          localStorage.setItem("userData", JSON.stringify(result.user));
          navigate("/");
        }
      } catch {
        navigate("/");
      }
    });
  };

  return (
    <div className="login-container">
      <img className="circle_bg" src={circleBg} />
      <img className="dummy_img" src={dummyImg} />

      <div className="login-box">
        <div className="logo-container">
          <img src={logo} height={28} width={22} alt="Logo" />
          <p className="logo-text">TaskBuddy</p>
        </div>
        <p className="login-param">
          Streamline your workflow and track progress effortlessly with our
          all-in-one task management app.
        </p>
        <button className="login-btn" onClick={googleSign}>
          <img src={google} />
          <p style={{ margin: 0, marginLeft: 10 }}>Continue with Google</p>
        </button>
      </div>
    </div>
  );
};

export default Login;
