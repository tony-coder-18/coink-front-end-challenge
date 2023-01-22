import { Component, OnInit } from '@angular/core';
import { ICharacter } from 'src/app/models/character.interface';
import { CharacterService } from 'src/app/services/character.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  // Create a characters list
  charactersList: ICharacter[] = [];

  // Inyect the Characters Service in the Constructor
  constructor(private characterService: CharacterService) { }

  ngOnInit(): void {
    //Get Characters list that the service gives us
    this.charactersList = this.characterService.getCharacters();
  }

}
