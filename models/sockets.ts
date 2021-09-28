import { Server } from "socket.io";
import BandList from "./band-list";

class Sockets {
  io: Server;
  bandList: BandList;

  constructor(io: Server) {
    this.io = io;
    this.bandList = new BandList();
    this.socketEvents();
  }

  socketEvents() {
    // On connection
    this.io.on("connection", (socket) => {
      console.log("Cliente conectado");
      socket.emit("current-bands", this.bandList.getBands());
    });
  }
}

module.exports = Sockets;
