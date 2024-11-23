import { Component } from '@angular/core';

@Component({
    selector: 'app-footer-layout',
    imports: [],
    templateUrl: './footer-layout.component.html',
    styleUrl: './footer-layout.component.css'
})
export class FooterLayoutComponent {
  year: number = new Date().getFullYear();
}
