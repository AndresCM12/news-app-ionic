import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces';

import { ActionSheetController, Platform } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';
import { Browser } from '@capacitor/browser';
import { Share } from '@capacitor/share';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  @Input() article?: Article;
  @Input() index: number;
  imageLoaded = false;
  imageError = false;
  constructor(
    private platform: Platform,
    private actionSheetCtrl: ActionSheetController,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    if (this.article.urlToImage === null) {
      this.imageLoaded = true;
    }
  }

  async openArticle() {
    if (this.platform.is('ios') || this.platform.is('android')) {
      await Browser.open({ url: this.article.url });
    } else {
      await Browser.open({ url: this.article.url });
    }
  }

  async onOpenMenu() {
    const articleInFavorite = this.storageService.articleInFavorites(
      this.article
    );

    const normalBtns = [
      {
        text: articleInFavorite ? 'Remover favorito' : 'Favorito',
        icon: articleInFavorite ? 'heart' : 'heart-outline',
        handler: () => this.onToggleFavorite(),
      },
      {
        text: 'Compartir',
        icon: 'share-outline',
        handler: () => this.onShareArticle(),
      },
      {
        text: 'Cancelar',
        icon: 'close-outline',
        role: 'cancel',
      },
    ];

    const actionSheet = await this.actionSheetCtrl.create({
      buttons: normalBtns,
      mode: 'ios',
    });

    await actionSheet.present();
  }

  async onShareArticle() {
    await Share.share({
      title: 'Look this article: ',
      text: '' + this.article.title,
      url: this.article.url,
      dialogTitle: 'Share the news',
    });
  }

  onToggleFavorite() {
    this.storageService.saveRemoveArticle(this.article);
  }

  onImageLoaded() {
    this.imageLoaded = true;
  }

  onImageError() {
    console.log('error', this.article.title);
    this.imageError = true;
    this.imageLoaded = true;
  }
}
