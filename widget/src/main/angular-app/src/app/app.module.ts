import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { PoModule, PoTableModule } from '@po-ui/ng-components';
import { HttpClientModule } from '@angular/common/http';
import { FluigService } from './services/fluig.service';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { ListCardsComponent } from './components/list-cards/list-cards.component';
import { APP_BASE_HREF } from '@angular/common';
import { APP_CONFIG } from './app.config';



@NgModule({
  declarations: [
    AppComponent,
    ListCardsComponent,
  ],
  imports: [
    BrowserModule,
    PoModule,
    HttpClientModule,
    PoTableModule,
    ReactiveFormsModule,
    AppRoutingModule,

  ],
  providers: [  { provide: APP_BASE_HREF, useValue: "/portal/p/1/painelcancelaprocessoemmassa" },
    FluigService],
  bootstrap: [AppComponent]
})
export class AppModule { }
