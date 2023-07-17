import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { GlobalLoaderComponent } from './global-loader/global-loader.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [GlobalLoaderComponent, NavigationComponent, FooterComponent],
  imports: [CommonModule, SharedModule, RouterModule],
  exports: [GlobalLoaderComponent, NavigationComponent, FooterComponent],
})
export class CoreModule {}
