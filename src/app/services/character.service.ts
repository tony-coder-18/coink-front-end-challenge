import { Injectable } from '@angular/core';

// Import the Characters List Mock
import { CHARACTERS } from '../mocks/characters.mock';
import { ICharacter } from '../models/character.interface';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor() { }

  getCharacters(): ICharacter[] {
    return CHARACTERS;
  }

  getCharactersByName(name: string): ICharacter | ICharacter[] | undefined {

    const characters = CHARACTERS.find((character: ICharacter) => character.name === name);

    if (characters) {
      return characters;
    } else {
      return;
    }
  }

  getCharactersByType(species: string): ICharacter | ICharacter[] | undefined {

    const characters = CHARACTERS.find((character: ICharacter) => character.species === species);

    if (characters) {
      return characters;
    } else {
      return;
    }
  }

}
