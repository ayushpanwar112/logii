import { Routes } from "@angular/router";

export const OPERATIONS_ROUTES:Routes=[
    {
        path:'master',
        loadChildren:()=>import('./master/master.routes').then(m=>m.MASTER_ROUTES)
    }
]