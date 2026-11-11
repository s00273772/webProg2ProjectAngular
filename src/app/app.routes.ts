import { Routes } from '@angular/router';
import { TrailList } from './features/trails/pages/trail-list/trail-list';
import { TrailDetails } from './features/trails/pages/trail-details/trail-details';
import { TrailForm } from './features/trails/pages/trail-form/trail-form';

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
        path:'trails/new',
        component: TrailForm
    },
    {
        path: 'trails/:id',
        component: TrailDetails
    },
    {
        path: 'trails/:id/edit',
        component: TrailForm
    },
];
