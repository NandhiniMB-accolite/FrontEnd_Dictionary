import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { Word } from "./Models/Words";

@Injectable()
export class WordService {

  GET_ALL_WORDS = "/word/getAll";
  SAVE_WORD = "/word/save";
  DELETE_WORD = "/word/delete/";

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(this.GET_ALL_WORDS);
  }

  addWord(payload: Word): Observable<any> {
    return this.http.post(this.SAVE_WORD, payload);
  }

  deleteWord(id: Number): Observable<any> {
    return this.http.get(this.DELETE_WORD + id);
  }

}
