import { Component, OnInit } from '@angular/core';
import { Word } from '../Models/Words';
import { WordService } from '../word.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  allWords: Array<Word> = [];
  words: Array<Word> = [];
  editableWord: Word = null;
  updatableWord:Word = null;
  searchValue:string = " ";
  selectOption:string = "";
  constructor(private wordService: WordService) { }

  ngOnInit(): void {
    this.wordService.getAll().subscribe(words => {
      this.allWords = words;
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
        this.allWords = this.words;
      }
    });
  }

  updateWord($event): void {
    console.log($event);
    this.updatableWord = $event;
    console.log(this.updatableWord);
    let indexValue = this.words.indexOf(this.updatableWord);
    this.wordService.updateWord(this.updatableWord).subscribe(word => {
      if(word) {
         this.words[indexValue+1] =  this.updatableWord;
         console.log(this.words);

      this.words[word.id]=word;
      this.allWords = this.words;
      }
    });
   
  }

  searchWord($event):void{
    console.log($event.target.value);
    this.wordService.searchWord($event.target.value).subscribe(words => {
      // console.log(res);
      this.words = words;
      // this.searchValue=" ";
    })
  }

  clearSearch():void{
    this.words = this.allWords;
   
  }

  sortWord($event):void{
    let opt = $event.target.value;

    if(opt=="time")
      this.words= [...this.words.sort((a,b)=> <any>new Date(a.lastModifiedTm) - <any>new Date(b.lastModifiedTm))];
    else
      this.words =  [...this.words.sort((a,b)=>a.word.localeCompare(b.word))];
    
     console.log(this.words);
  }
}





