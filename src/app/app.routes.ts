import { Routes } from '@angular/router';
import { TrailList } from './features/trails/pages/trail-list/trail-list';
import { TrailDetails } from './features/trails/pages/trail-details/trail-details';

export const routes: Routes = [

    {
        path: '',
        redirectTo: 'trails',
        pathMatch: 'full'
    },
    {
        path: 'trails',
        component: TrailList
    },
    {
        path: 'trails/:id',
        component: TrailDetails
    },
];
