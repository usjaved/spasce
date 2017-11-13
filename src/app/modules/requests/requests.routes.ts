import { RequestListComponent } from './request-list/request-list.component';
import { RequestAddComponent } from './request-add/request-add.component';
import { RequestDetailComponent } from './request-detail/request-detail.component';
import { RequestEditComponent } from './request-edit/request-edit.component';


export const routes = [
    {
        path: '', children: [
            { path: '', component: RequestListComponent },
            { path: 'new', component:  RequestAddComponent},
            { path:'detail/:id', component: RequestDetailComponent},
            { path:'edit/:id', component :RequestEditComponent }
        ]
    },
];