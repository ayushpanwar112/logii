import { Routes } from '@angular/router';
import { Layout } from './layout';

export const LAYOUT_ROUTES:Routes=[
    {

      path:'',component:Layout,children:[{path:'operations',
        loadChildren:()=>import('../../features/operations/operations.routes').then(m=>m.OPERATIONS_ROUTES)
    }]}
]