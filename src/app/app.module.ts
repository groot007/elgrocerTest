import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { IndexPageComponent } from './index-page/index-page.component';
import { SearchPageComponent } from './search-page/search-page.component';

import {AuthService} from './auth/auth.service';
import {TokenInterceptor} from './auth/token.interceptor';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import {AddressesService} from './shared/services/addresses.service';

import {StoresService} from './shared/services/stores.service';
import {StoresPopupComponent} from './shared/components/stores-popup/stores-popup.component';
import {BasketComponent} from './shared/components/basket/basket.component';
import {CategoriesComponent} from './index-page/categories/categories.component';
import {SearchFormComponent} from './shared/components/search-form/search-form.component';
import {NavigationComponent} from './shared/components/navigation/navigation.component';
import {FooterComponent} from './shared/components/footer/footer.component';
import {NgxCarouselModule} from 'ngx-carousel';
import {CarouselComponent} from './index-page/carousel/carousel.component';
import 'hammerjs';
import {StickyHeaderDirective} from './shared/directives/sticky-header.directive';
import { CategoriesListComponent } from './search-page/categories-list/categories-list.component';
import { ProductsComponent } from './search-page/products/products.component';
import {BasketService} from './shared/services/basket.service';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { HeaderAddressComponent } from './shared/components/header-address/header-address.component';
import {ProductsFilterPipe} from './shared/pipes/products-filter.pipe';



const routes: Routes = [
  {path: '', component: IndexPageComponent},
  {path: 'search', component: SearchPageComponent},
  {path: 'search/:searchQuery', component: SearchPageComponent},
];


@NgModule({
  declarations: [
    AppComponent,
    IndexPageComponent,
    SearchPageComponent,
    StoresPopupComponent,
    BasketComponent,
    CategoriesComponent,
    SearchFormComponent,
    NavigationComponent,
    CarouselComponent,
    FooterComponent,
    StickyHeaderDirective,
    CategoriesListComponent,
    ProductsComponent,
    ProductsFilterPipe,
    HeaderAddressComponent
  ],
  imports: [
    BrowserModule,
    InfiniteScrollModule,
    HttpClientModule,
    NgxCarouselModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    AddressesService,
    StoresService,
    BasketService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
