import { v4 as uuid } from "uuid";

class Band {
  id: string;
  name: string;
  votes: number;

  constructor(name: string) {
    this.id = uuid();
    this.name = name;
    this.votes = 0;
  }
}

export default Band;
