import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

// Import the Characters List Mock
import { CHARACTERS } from '../mocks/characters.mock';
import { ICharacter } from '../models/character.interface';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  API_BASE_URL =  "https://rickandmortyapi.com/api/character/";

  // For handling error messages that show up in the Error component
  private $error = new Subject<string>();

  constructor(private http: HttpClient) { }

  // For handling error messages that show up in the Error component
  setError(message: string) {
    this.$error.next(message);
  }

  getError(): Observable<string> {
    return this.$error.asObservable();
  }
  //

  searchCharacters(name: string = '', type: string = '', page: number = 1) {
    return this.http.get<ICharacter[]>(`${this.API_BASE_URL}?name=${name}&species=${type}&page=${page}`)
  }

}
