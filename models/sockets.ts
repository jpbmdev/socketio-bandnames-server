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

      //Emitir al nuevo cliente conectado las bandas actuales
      socket.emit("current-bands", this.bandList.getBands());

      //Votar por una banda
      socket.on("votar-banda", (id: string) => {
        this.bandList.increaseVotes(id);
        //Emitimos el evento a todos los clientes
        this.io.emit("current-bands", this.bandList.getBands());
      });

      //Borrar una banda
      socket.on("borrar-banda", (id: string) => {
        this.bandList.removeBand(id);
        //Emitimos el evento a todos los clientes
        this.io.emit("current-bands", this.bandList.getBands());
      });

      //Cambiar Nombre Banda
      socket.on(
        "cambiar-nombre-banda",
        (data: { id: string; nombre: string }) => {
          this.bandList.changeName(data.id, data.nombre);
          //Emitimos el evento a todos los clientes
          this.io.emit("current-bands", this.bandList.getBands());
        }
      );

      //Crear una banda
      socket.on("crear-banda", (data: { nombre: string }) => {
        this.bandList.addBand(data.nombre);
        //Emitimos el evento a todos los clientes
        this.io.emit("current-bands", this.bandList.getBands());
      });
    });
  }
}

module.exports = Sockets;
