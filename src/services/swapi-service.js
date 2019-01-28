export default class SwapiService {

  api = 'https://swapi.co/api/';

  getResource = async (url) => {
    const res = await fetch(`${this.api}${url}`);
    if (!res.ok) {
      throw new Error(`Could not fetch ${this.api}${url}, received ${res.status}`);
    }
    return await res.json();
  }

  getAllPeople = async () => {
    const res = await this.getResource(`people`);
    return res.results.map(this.transformPerson);
  }

  getPerson = async (id) => {
    const person = await this.getResource(`people/${id}`);
    return this.transformPerson(person);
  }

  getAllPlanets = async () => {
    const res = await this.getResource(`planets`);
    return res.results.map(this.transformPlanet);
  }

  getPlanet = async (id) => {
    const planet = await this.getResource(`planets/${id}`);
    return this.transformPlanet(planet);
  }

  getAllStarships = async () => {
    const res = await this.getResource(`starships`);
    return res.results.map(this.transformStarship);
  }

  getStarship = async (id) => {
    const starship = await this.getResource(`starships/${id}`);
    return this.transformStarship(starship);
  }

  findId(link) {
    const regexp = /\/([0-9]*)\/$/;
    return link.url.match(regexp)[1];
  }

  transformPlanet = (planet) => {
    return {
      id: this.findId(planet),
      name: planet.name,
      population: planet.population,
      rotationPeriod: planet.rotation_period,
      diameter: planet.diameter
    }
  }

  transformPerson = (person) => {
    return {
      id: this.findId(person),
      name: person.name,
      gender: person.gender,
      birthYear: person.birth_year,
      eyeColor: person.eye_color
    }
  }

  transformStarship = (starship) => {
    return {
      id: this.findId(starship),
      name: starship.name,
      model: starship.model,
      manufacturer: starship.manufacturer,
      costInCredits: starship.cost_in_credits,
      length: starship.length,
      crew: starship.crew,
      passengers: starship.passengers,
      cargoCapacity: starship.cargo_capacity
    }
  }
}