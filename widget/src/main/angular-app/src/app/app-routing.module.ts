import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ListCardsComponent } from './components/list-cards/list-cards.component';


const routes: Routes = [
  // Rota inicial que mostra o card-list no app-component
  { path: '', component: ListCardsComponent, pathMatch: 'full' },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }