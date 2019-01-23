export default class SwapiService {

  api = 'https://swapi.co/api/';

  async getResource(url) {
    const res = await fetch(`${this.api}${url}`);
    if (!res.ok) {
      throw new Error(`Could not fetch ${this.api}${url}, received ${res.status}`);
    }
    return await res.json();
  }

  async getAllPeople() {
    const res = await this.getResource(`people`);
    return res.results.map(this.transformPerson);
  }

  async getPerson(id) {
    const person = this.getResource(`people/${id}`);
    return this.transformPerson(person);
  }

  async getAllPlanets() {
    const res = await this.getResource(`planets`);
    return res.results.map(this.transformPlanet);
  }

  async getPlanet(id) {
    const planet = await this.getResource(`planets/${id}`);
    return this.transformPlanet(planet);
  }

  async getAllStarships() {
    const res = await this.getResource(`starships`);
    return res.results.map(this.transformStarship);
  }

  async getStarship(id) {
    const starship = this.getResource(`starships/${id}`);
    return this.transformStarship(starship);
  }

  findId(link) {
    const regexp = /\/([0-9]*)\/$/;
    return link.url.match(regexp)[1];
  }

  transformPlanet(planet) {
    return {
      id: this.findId(planet),
      name: planet.name,
      population: planet.population,
      rotationPeriod: planet.rotation_period,
      diameter: planet.diameter
    }
  }

  transformPerson(person) {
    return {
      id: this.findId(person),
      name: person.name,
      gender: person.gender,
      birthYear: person.birthYear,
      eyeColor: person.eyeColor
    }
  }

  transformStarship(starship) {
    return {
      id: this.findId(starship),
      name: starship.name,
      model: starship.model,
      manufacturer: starship.manufacturer,
      costInCredits: starship.costInCredits,
      length: starship.length,
      crew: starship.crew,
      passengers: starship.passengers,
      cargoCapacity: starship.cargoCapacity
    }
  }
}