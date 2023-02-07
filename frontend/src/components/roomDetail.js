import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../api/axios";

const RoomDetail = () => {
  const { id } = useParams();
  const [room, setRoom] = useState();
  const [users, setUsers] = useState([]);

  const getData = async () => {
    const ROOM_URL = "/room";

    try {
      const { data } = await axios.get(`${ROOM_URL}/${id}`);
      if (data?.status === true) {
        setRoom(data?.data.room);
        setUsers(data?.data.room.users);
        console.log(room);
        console.log(users);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (id) {
      getData();
    }
  }, []);

  return (
    <div className="container">
      <div>Room name: {room?.name}</div>
      <div>Member:</div>
      {users?.map((user) => (
        <div key={user._id}>{user?.firstName}</div>
      ))}
    </div>
  );
};

export default RoomDetail;
