import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './game.component';
import { GameService } from './game.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [GameComponent],
  imports: [
    CommonModule,
    GameRoutingModule,
    SharedModule
  ],
  providers: [GameService]
})
export class GameModule { }
