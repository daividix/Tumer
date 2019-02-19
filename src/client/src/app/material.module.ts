import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatStepperModule} from '@angular/material/stepper';
import {MatBadgeModule} from '@angular/material/badge';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatChipsModule} from '@angular/material/chips';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import {MatTreeModule} from '@angular/material/tree';

import { NgModule } from '@angular/core';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatToolbarModule,
        MatIconModule,
        MatTabsModule,
        MatCardModule,
        MatInputModule,
        MatDialogModule,
        MatSnackBarModule,
        MatTooltipModule,
        MatStepperModule,
        MatBadgeModule,
        MatSidenavModule,
        MatChipsModule,
        MatMenuModule,
        MatListModule,
        MatTreeModule
    ],
    exports: [
        BrowserAnimationsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatToolbarModule,
        MatIconModule,
        MatTabsModule,
        MatCardModule,
        MatInputModule,
        MatDialogModule,
        MatSnackBarModule,
        MatTooltipModule,
        MatStepperModule,
        MatBadgeModule,
        MatSidenavModule,
        MatChipsModule,
        MatMenuModule,
        MatListModule,
        MatTreeModule
    ]
})

export class MaterialModules {}
