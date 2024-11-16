import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderLayoutComponent } from "../header-layout/header-layout.component";
import { BodyLayoutComponent } from "../body-layout/body-layout.component";
import { FooterLayoutComponent } from "../footer-layout/footer-layout.component";
import { AsideLayoutComponent } from "../aside-layout/aside-layout.component";

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [HeaderLayoutComponent, BodyLayoutComponent, FooterLayoutComponent, AsideLayoutComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {

}
