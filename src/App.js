import { useCallback, useContext, useEffect, useState } from "react";
import Loader from "./components/Loader/Loader.js";
import Home from "./components/Home/Home.js";
import { useNavigate } from "react-router";
import { TaskContext } from "./context/TaskContext.js";

function App() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { setUserData } = useContext(TaskContext);

  const fetchDataFromLocalStorage = useCallback(() => {
    const myData = localStorage.getItem("userData");
    const result = JSON.parse(myData);
    if (myData !== null) {
      setLoading(false);
      setUserData(result);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    fetchDataFromLocalStorage();
  }, [fetchDataFromLocalStorage]);

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
