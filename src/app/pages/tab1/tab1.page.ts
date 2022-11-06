import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  endline = false;
  articles: Article[] = [];
  filtredArticles: Article[] = [];
  articlesAreLoaded = false;
  searchText = '';

  constructor(private newsService: NewsService) {}

  async ngOnInit() {
    this.newsService
      .getTopHeadlinesByCategory('technology')
      .subscribe((articles) => {
        this.articles.push(...articles);
        this.filtredArticles = this.articles;
        this.articlesAreLoaded = true;
      });
  }

  loadData(event: any) {
    this.articlesAreLoaded = false;

    this.newsService
      .getTopHeadlinesByCategory('technology', true)
      .subscribe((articles) => {
        this.articles = articles;
        event.target.complete();
        this.articlesAreLoaded = true;
      });
  }

  search() {
    this.filtredArticles = this.articles.filter((article) =>
      article.title.toLowerCase().includes(this.searchText.toLowerCase())
    );
    console.log(this.filtredArticles);
  }
}
