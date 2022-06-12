import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MundarijaComponent } from './mundarija/mundarija.component';
import { TestComponent } from './test/test.component';
import { CrosswordComponent } from './crossword/crossword.component';
import { VideoComponent } from './video/video.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { HelpComponent } from './help/help.component';
import { HttpClientModule } from '@angular/common/http';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [
    AppComponent,
    MundarijaComponent,
    TestComponent,
    CrosswordComponent,
    VideoComponent,
    ExercisesComponent,
    HelpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
