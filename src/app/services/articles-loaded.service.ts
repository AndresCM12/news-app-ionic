/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ArticlesLoadedService {
  articlesLoaded: boolean;
  constructor() {}

  setArticlesLoaded(articlesLoaded: boolean) {
    this.articlesLoaded = articlesLoaded;
  }
  getArticesLoaded() {
    console.log(this.articlesLoaded);
    return this.articlesLoaded;
  }
}
