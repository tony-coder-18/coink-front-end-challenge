import { Component, OnInit, ViewChild } from '@angular/core';
import { ICharacter } from 'src/app/models/character.interface';
import { CharacterService } from 'src/app/services/character.service';
import { take, catchError } from 'rxjs/operators'
import { FormBuilder } from '@angular/forms';

type RequestInfo = {
  next: string | null,
  prev: string | null,
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  displayedColumns: string[] = ["name", "species", "status"];

  // Create a characters list
  charactersList: ICharacter[] = [];

  // Request info (useful for knowing when the characters navigation begins and ends)
  info: RequestInfo = {
    next: '',
    prev: '',
  };

  //Create character search default value
  searchNameValue: string = '';
  searchTypeValue: string = '';
  searchPageValue: number = 1;

  // Create search form
  searchForm = this.fb.nonNullable.group({
    searchNameValue: '',
    searchTypeValue: ''
  })

  // Inyect the Characters Service in the Constructor
  constructor(private characterService: CharacterService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.searchCharacters();
  }

  searchCharacters(): void {
    this.characterService
    .searchCharacters(this.searchNameValue, this.searchTypeValue, this.searchPageValue)
    .subscribe((res: any) => {
      if (res?.results?.length) {
        console.log(res.results);
        const { info, results } = res;
        this.charactersList = results;
        this.info = info;
      } else {
        this.charactersList = [];
        this.info = {
          next: '',
          prev: '',
        }
      }
    }, error => {
      if (error.status === 404) {
        // Did not found any character with that query:
        this.charactersList = [];
        this.info = {
          next: '',
          prev: '',
        }
      } else {
        // Other server error:
        this.characterService.setError('Hubo un error en el servidor');
        this.charactersList = [];
        this.info = {
          next: '',
          prev: '',
        };
        console.log(error);
      }
    })
  }

  // It will trigger when searching with the filters
  onSearchSubmit(): void {
    this.searchNameValue = this.searchForm.value.searchNameValue ?? '';
    this.searchTypeValue = this.searchForm.value.searchTypeValue ?? '';
    this.searchCharacters();
  }

  // Clean all the filters and show the default information
  cleanFilters(): void {
    this.searchForm.reset();
    this.searchPageValue = 1;
    this.onSearchSubmit();
  }

  // Show the next/prev page os characters
  changePageNumber(pageNumber: number): void {
    if (pageNumber <= 0) {
      pageNumber = 1;
    }
    this.searchPageValue = pageNumber;
    this.searchCharacters();
  }

}
