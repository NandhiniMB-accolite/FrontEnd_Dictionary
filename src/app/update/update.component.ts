import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Word } from '../Models/Words';
import { WordService } from '../word.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit, OnChanges {

  @Input('action') buttonLabel;
  @Input('editableData') editableData;
  @Output() updateWord = new EventEmitter<any>();

  wordForm: FormGroup;
  addWordPayload: Word;
  id: Number;

  constructor(private wordService: WordService) {}

  ngOnInit(): void {
    this.wordForm = new FormGroup({
      word: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      meaning: new FormControl(null, [Validators.required, Validators.maxLength(150), Validators.minLength(10)]),
      partOfSpeech: new FormControl(null, [Validators.required]),
      example: new FormControl(null, [Validators.required]),
    });
  }

  addOrUpdateWord(): void {
    this.addWordPayload = this.wordForm.value;
    if(this.buttonLabel.includes("Update")) {
      this.updateWord.emit({
        ...this.wordForm.value,
        id: this.id,
      })
    } else {
      this.wordService.addWord(this.addWordPayload).subscribe(resp => {
        console.log(resp);
      });
    }

  }
  ngOnChanges(changes) {
    if(changes.editableData && changes.editableData.currentValue != changes.editableData.previousValue) {
      this.id = this.editableData.id;
      delete this.editableData.id;
      delete this.editableData.creationTm;
      delete this.editableData.lastModifiedTm;
      this.wordForm.setValue(this.editableData);
    }
  }

}
