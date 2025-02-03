import logo from "../../assets/logo.png";
import "./Login.css";
import login from "../../assets/login.png";
import circleBg from "../../assets/circles_bg.png";
import dummyImg from "../../assets/login-dummy-img.png";
import google from "../../assets/google.png";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "../../hooks/useIsMobile";

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
  const { isMobile } = useIsMobile();
  return (
    <div
      className="login-container"
      style={isMobile ? { justifyContent: "center" } : {}}>
      {isMobile && (
        <img
          className="login_bg"
          src={login}
          alt="background_img"
          draggable="false"
        />
      )}

      {!isMobile && (
        <img className="circle_bg" src={circleBg} draggable="false" />
      )}
      {!isMobile && (
        <img className="dummy_img" src={dummyImg} draggable="false" />
      )}

      <div className={isMobile ? "login-box-moblie-view" : "login-box"}>
        <div className="logo-container">
          <img src={logo} height={28} width={22} alt="Logo" draggable="false" />
          <p className="logo-text">TaskBuddy</p>
        </div>
        <p className="login-param">
          Streamline your workflow and track progress effortlessly with our
          all-in-one task management app.
        </p>
        <button className="login-btn" onClick={googleSign}>
          <img src={google} alt="icon" draggable="false" />
          <p
            style={{ margin: 0, marginLeft: 10, fontSize: isMobile ? 14 : 18 }}>
            Continue with Google
          </p>
        </button>
      </div>
    </div>
  );
};

export default Login;
