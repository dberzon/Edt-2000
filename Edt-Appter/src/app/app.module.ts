import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {SocketIoModule} from 'ngx-socket-io';
import {socketConfig} from '../../../SharedTypes/socket';
import { PushButtonComponent } from './inputs/push-button.component';
import { ToggleButtonComponent } from './inputs/toggle-button.component';

@NgModule({
  declarations: [
    AppComponent,
    PushButtonComponent,
    ToggleButtonComponent,
  ],
  imports: [
    SocketIoModule.forRoot(socketConfig),
    BrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
