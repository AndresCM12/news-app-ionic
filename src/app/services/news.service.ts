import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  Article,
  ArticlesByCategoryAndPage,
  NewsResponse,
} from '../interfaces';
import { catchError, map } from 'rxjs/operators';
const apiKey = environment.apiKey;
const apiKey2 = environment.apiKey2;

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private articlesByCategoryAndPage: ArticlesByCategoryAndPage = {
    business: {
      page: 0,
      articles: [],
    },
  };
  constructor(private http: HttpClient) {}

  getTopHeadlines(): Observable<Article[]> {
    return this.getArticlesByCategory('business');
    // return this.executeQuery<NewsResponse>(`/top-headlines`).pipe(
    //   map((data) => data.articles)
    // );
  }

  getTopHeadlinesByCategory(
    category: string,
    loadMore: boolean = false
  ): Observable<Article[]> {
    if (loadMore) {
      return this.getArticlesByCategory(category);
    }

    if (this.articlesByCategoryAndPage[category]) {
      //crear observable con los articulos del arreglo
      return of(this.articlesByCategoryAndPage[category].articles);
    }

    return this.getArticlesByCategory(category);
  }

  private getArticlesByCategory(category: string): Observable<Article[]> {
    //verificar si no existe el articulo en el arreglo
    if (!Object.keys(this.articlesByCategoryAndPage).includes(category)) {
      //no existe el articulo en el arreglo
      this.articlesByCategoryAndPage[category] = {
        page: 0,
        articles: [],
      };
    }
    const page = this.articlesByCategoryAndPage[category].page + 1;

    return this.executeQuery<NewsResponse>(
      `/top-headlines?category=${category}&page=${page}`
    ).pipe(
      map(({ articles }) => {
        if (articles.length === 0) {
          return this.articlesByCategoryAndPage[category].articles;
        }

        this.articlesByCategoryAndPage[category] = {
          page,
          articles: [
            ...this.articlesByCategoryAndPage[category].articles,
            ...articles,
          ],
        };
        return this.articlesByCategoryAndPage[category].articles;
      })
    );
    console.log('Petición HTTP realizada');
  }

  private executeQuery<T>(endpoint: string) {
    console.log('Petición HTTP realizada');
    return this.http
      .get<T>(`${apiUrl}${endpoint}`, {
        params: {
          apiKey,
          country: 'mx',
        },
      })
      .pipe(
        catchError((err) => {
          if (err.status === 429) {
            return this.http.get<T>(`${apiUrl}${endpoint}`, {
              params: {
                apiKey: apiKey2,
                country: 'mx',
              },
            });
          } //cuando se agota el limite de peticiones
        })
      );
  }
}
