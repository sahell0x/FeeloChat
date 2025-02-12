import { io } from "socket.io-client";
import { HOST } from "./util/constants";
const socket = io(HOST, {
  withCredentials: true
});

export default socket;