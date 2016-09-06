import { NgModule } from '@angular/core';

// import { AdminModule } from './+admin';
import { HomeContainer } from './home';
import { ShareModule } from '../shared';
import { LoginContainer } from './login';
import { ROUTING } from './container.routes';

@NgModule({
  imports: [ ROUTING, ShareModule ],
  declarations: [ HomeContainer, LoginContainer ]
})
export class ContainerModule {
  constructor()  {
    console.log('--CONTAINER MODULE INITED--');
  }
}
