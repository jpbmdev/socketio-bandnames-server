import Band from "./band";

class BandList {
  bands: Band[];
  constructor() {
    this.bands = [
      new Band("Metallica"),
      new Band("Slipknot"),
      new Band("Disturbed"),
      new Band("Bon Jovi"),
    ];
  }

  addBand(name: string) {
    const newBand = new Band(name);
    this.bands.push(newBand);
    return this.bands;
  }

  removeBand(id: string) {
    this.bands = this.bands.filter((band) => band.id !== id);
  }

  getBands() {
    return this.bands;
  }

  increaseVotes(id: string) {
    this.bands = this.bands.map((band) => {
      if (band.id === id) {
        band.votes += 1;
      }
      return band;
    });
  }

  changeName(id: string, newName: string) {
    this.bands = this.bands.map((band) => {
      if (band.id === id) {
        band.name = newName;
      }
      return band;
    });
  }
}

export default BandList;
