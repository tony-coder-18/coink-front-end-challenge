import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CharacterService } from 'src/app/services/character.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit, OnDestroy {

  text: string = '';
  show: boolean = false;
  subscription: Subscription;

  constructor(private characterService: CharacterService) { 
    this.subscription = this.characterService.getError().subscribe(data => {
      this.showMessage();
      this.text = data;
    })
   }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  showMessage(): void {
    this.show = true;
    setTimeout(() => {
      this.show = false;
    }, 4000);
  }

}
