import { Component } from '@angular/core';

@Component({
  selector: 'ow-header',
  template: 
  `<header>
      <h1>Odds Viewer</h1>
      <nav>
          <a routerLink="/" routerLinkActive="active">Home</a>
      </nav>
      <div style="clear:both;"></div>
  </header>
  `
})
export class OwHeaderComponent{

}
