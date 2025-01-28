import { useEffect, useState } from "react";
import "./App.css";
import Loader from "./components/Loader/Loader.js";
import Home from "./components/Home/Home.js";
import { useNavigate } from "react-router";

function App() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  const fetchDataFromLocalStorage = async () => {
    const myData = localStorage.getItem("userData");
    const result = await JSON.parse(myData);
    if (myData !== null) {
      setLoading(false);
      setUserData(result);
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchDataFromLocalStorage();
  }, [fetchDataFromLocalStorage]);

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="App">
      <Home userData={userData} />
    </div>
  );
}

export default App;
