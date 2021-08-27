import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {path: '', loadChildren: () => import('./pages/accueil/accueil.module').then(m => m.AccueilModule)},
  {path: 'gestion', loadChildren: () => import('./pages/gestion/gestion.module').then(m => m.GestionModule)},
  {
    path: 'course-pre-defined',
    loadChildren: () => import('./pages/liste-couse-predefined/liste-course-predefined.module').then(m => m.ListeCoursePredefinedModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
