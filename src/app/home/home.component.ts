import { Component, OnInit } from '@angular/core';
import { Word } from '../Models/Words';
import { WordService } from '../word.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  words: Array<Word> = [];
  editableWord: Word = null;
  constructor(private wordService: WordService) { }

  ngOnInit(): void {
    this.wordService.getAll().subscribe(words => {
      this.words = words;
    });
  }

  edit(word: Word): void {
    this.editableWord = word;
  }

  delete(word: Word): void {
    this.wordService.deleteWord(word.id).subscribe(res => {
      console.log(res);
      if(res) {
        this.words = this.words.filter(oldWord => word.id != oldWord.id);
      }
    })
  }

  updateWord($event): void {
    console.log($event);

    //update the word in database
  }

}
