import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '',
    redirectTo: '/virtual-switch/dashboard',
    pathMatch: 'full'
  },
  { path: 'virtual-switch/about',
    component: AboutComponent
  },
  { path: 'virtual-switch/contact',
    component: ContactComponent
  },
  { path: 'virtual-switch/dashboard',
    component: DashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
