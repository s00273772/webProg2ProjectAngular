import { Routes } from '@angular/router';
import { TrailList } from './features/trails/pages/trail-list/trail-list';
import { TrailDetails } from './features/trails/pages/trail-details/trail-details';
import { TrailForm } from './features/trails/pages/trail-form/trail-form';
import { HikerList } from './features/hikers/pages/hiker-list/hiker-list';
import { HikerDetails } from './features/hikers/pages/hiker-details/hiker-details';
import { HikerForm } from './features/hikers/pages/hiker-form/hiker-form';
import { HikerTrailList } from './features/hikerTrails/pages/hiker-trail-list/hiker-trail-list';
import { HikerTrailForm } from './features/hikerTrails/pages/hiker-trail-form/hiker-trail-form';
import { HikerTrailDetails } from './features/hikerTrails/pages/hiker-trail-details/hiker-trail-details';


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
    {
        path: 'hikers',
        component: HikerList
    },
    {
        path:'hikers/new',
        component: HikerForm
    },
    {
        path: 'hikers/:id',
        component: HikerDetails
    },
    {
        path: 'hikers/:id/edit',
        component: HikerForm
    },
    {
        path: 'hikerTrails',
        component: HikerTrailList
    },
    {
        path:'hikerTrails/new',
        component: HikerTrailForm
    },
    {
        path: 'hikerTrails/:id',
        component: HikerTrailDetails
    },
    {
        path: 'hikerTrails/:id/edit',
        component: HikerTrailForm
    },
];
