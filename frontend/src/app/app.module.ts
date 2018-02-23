import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";
import { AlertModule, BsDropdownModule, ProgressbarModule } from "ngx-bootstrap";

import { AppComponent } from './app.component';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		HttpModule,
		AlertModule.forRoot(),
		BsDropdownModule.forRoot(),
		ProgressbarModule.forRoot(),
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
