import { Component, OnInit, ViewChild } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';
import { Article } from '../../interfaces/index';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  @ViewChild(IonContent) content: IonContent;
  searchText = '';

  public categories: string[] = [
    'business',
    'entertainment',
    'general',
    'health',
    'science',
    'sports',
    'technology',
  ];

  public articles: Article[] = [];
  filtredArticles: Article[] = [];
  endline = false;
  public selectedCategory = this.categories[0];
  articlesAreLoaded = false;

  constructor(private newsService: NewsService) {}

  async ngOnInit() {
    this.newsService.getTopHeadlines().subscribe((articles) => {
      this.articles = [...articles];
      this.filtredArticles = this.articles;
      this.articlesAreLoaded = true;
    });
  }

  segmentChanged(event: any) {
    this.articlesAreLoaded = false;

    this.content.scrollToTop(1000);
    this.selectedCategory = event.detail.value;
    this.newsService
      .getTopHeadlinesByCategory(this.selectedCategory)
      .subscribe((articles) => {
        this.articles = [...articles];
        this.filtredArticles = this.articles;
        this.articlesAreLoaded = true;
      });
  }

  loadData(event: any) {
    this.articlesAreLoaded = false;

    this.newsService
      .getTopHeadlinesByCategory(this.selectedCategory, true)
      .subscribe((articles) => {
        this.articles = articles;
        this.filtredArticles = this.articles;
        event.target.complete();
      });
    this.articlesAreLoaded = true;
  }

  search() {
    this.filtredArticles = this.articles.filter((article) =>
      article.title.toLowerCase().includes(this.searchText.toLowerCase())
    );
    console.log(this.filtredArticles, this.searchText);
  }
}
