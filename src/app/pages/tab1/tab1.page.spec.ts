import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActionSheetController, IonicModule, Platform } from '@ionic/angular';
import { NewsService } from 'src/app/services/news.service';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';
import { Tab1Page } from './tab1.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing';
import { StorageService } from 'src/app/services/storage.service';
import { ArticlesLoadedService } from 'src/app/services/articles-loaded.service';
import { RouterLink } from '@angular/router';
import {
  HttpClient,
  HttpClientModule,
  HttpHandler,
} from '@angular/common/http';

fdescribe('Tab1Page', () => {
  let component: Tab1Page;
  let fixture: ComponentFixture<Tab1Page>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [Tab1Page],
      providers: [NewsService, StorageService, ArticlesLoadedService],
      imports: [
        IonicModule.forRoot(),
        ExploreContainerComponentModule,
        ComponentsModule,
        HttpClientModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Tab1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
