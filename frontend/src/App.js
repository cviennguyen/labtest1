import SignUp from "./components/signup";
import Login from "./components/login";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import JoinRoom from "./components/joinRoom";
import RoomDetail from "./components/roomDetail";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join-room" element={<JoinRoom />} />
        <Route path="/join-room/:id" element={<RoomDetail />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
