import { ToastrModule } from 'ngx-toastr';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import {MainComponent} from './main/main.component';
import {SideNavComponent} from './side-nav/side-nav.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {OrdersComponent} from './orders/orders.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSliderModule} from '@angular/material/slider';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';
import {AdminService} from './admin.service';
import { OrderPopupComponent } from './order-popup/order-popup.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { FormsModule } from '@angular/forms';
import { MessagesComponent } from './messages/messages.component';
import { DesignsComponent } from './designs/designs.component';
import { ChartsModule } from 'ng2-charts';
import { MessagePopupComponent } from './message-popup/message-popup.component';

@NgModule({
    declarations: [DashboardComponent,
      MainComponent,
      SideNavComponent,
      UserProfileComponent,
      OrdersComponent,
      OrderPopupComponent,
      TopBarComponent,
      MessagesComponent,
      DesignsComponent,
      MessagePopupComponent
    ],
    imports: [
        CommonModule,
        MatAutocompleteModule,
        MatBadgeModule,
        MatBottomSheetModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatStepperModule,
        MatDatepickerModule,
        MatDialogModule,
        MatDividerModule,
        MatExpansionModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        MatTreeModule,
        FormsModule,
        ChartsModule,
        ToastrModule.forRoot(),
        RouterModule.forChild([
            {
                path: '',
                component: DashboardComponent,
                children: [
                    {
                        path: '',
                        component: MainComponent,
                    }
                    ,
                    {
                        path: 'userProfiles',
                        component: UserProfileComponent
                    },
                    {
                        path: 'orders',
                        component: OrdersComponent
                    },
                    {
                        path: 'messages',
                        component: MessagesComponent
                    },
                    {
                        path: 'designs',
                        component: DesignsComponent
                    }
                ]
            }
        ])
    ],
    bootstrap: [DashboardComponent],
    exports: [],
    providers: [
        AdminService
    ],
    entryComponents: [OrderPopupComponent, MessagePopupComponent]
})
export class DashboardModule {
}
