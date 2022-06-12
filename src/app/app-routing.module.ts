import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrosswordComponent } from './crossword/crossword.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { HelpComponent } from './help/help.component';
import { MundarijaComponent } from './mundarija/mundarija.component';
import { TestComponent } from './test/test.component';
import { VideoComponent } from './video/video.component';

const routes: Routes = [
  { path: 'crossword', component: CrosswordComponent },
  { path: 'exercises', component: ExercisesComponent },
  { path: 'help', component: HelpComponent },
  { path: 'mundarija', component: MundarijaComponent },
  { path: 'test', component: TestComponent },
  { path: 'video', component: VideoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
