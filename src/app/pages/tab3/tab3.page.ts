import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  articlesAreLoaded = false;
  searchText = '';
  filtredArticles: Article[];

  constructor(private storageService: StorageService) {}

  get articles(): Article[] {
    //los getters ayudan a que si algo cambia automaticamente dispara el ciclo de deteccion de cambios de angular
    return this.storageService.localArticles;
  }

  async ngOnInit() {
    await this.storageService.loadFavorites();
    this.filtredArticles = this.articles;
    this.articlesAreLoaded = true;
  }

  search() {
    this.filtredArticles = this.articles.filter((article) =>
      article.title.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}
