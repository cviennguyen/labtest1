import { useContext, useEffect } from "react";
import axios from "../api/axios";
import { RoomContext } from "../context/roomProvider";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";

const ROOM_URL = "/room";
const token = JSON.parse(localStorage.getItem("userInfo")).token;
const userInfo = JSON.parse(localStorage.getItem("userInfo")).data.user;

const JoinRoom = () => {
  const { user } = useContext(RoomContext);
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
  }

  const [rooms, setRooms] = useState([]);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const getData = async () => {
    try {
      const { data } = await axios.get(ROOM_URL, config);
      setRooms(data.data.rooms);
      console.log(rooms);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (token) {
      const user = jwt_decode(token);
      if (!user) {
        alert("Please login to continue ***");
        navigate("/login");
      } else {
        getData();
      }
    } else {
      alert("Please login to continue");
      navigate("/login");
    }
  }, []);

  return (
    <div className="container">
      <h1>Chat app</h1>
      <div>User: {userInfo.username}</div>
      {rooms.map((room) => (
        <div key={room._id}>
          {room.name}
          <Link to={room._id} className="btn btn-danger">
            Join
          </Link>
        </div>
      ))}
    </div>
  );
};

export default JoinRoom;
