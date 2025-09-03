
import { Routes } from "@angular/router";

import { ConsigneeList } from "./pages/consignee/consignee.list/consignee.list";

export const MASTER_ROUTES:Routes=[

    {
        path:'consignee',
        component: ConsigneeList
    }
]