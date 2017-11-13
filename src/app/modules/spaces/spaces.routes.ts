import { SpacseEditComponent } from './spacse-edit/spacse-edit.component';
import { SpacesListComponent } from './spaces-list/list.component';
import { SpaceAddComponent } from './spaces-add/space-add.component';
import { SpacesDetailComponent } from './spaces-detail/spaces-detail.component';


export const routes = [
    {
        path: '', children: [
            { path: '', component: SpacesListComponent },
            { path: 'new', component:  SpaceAddComponent},
            { path: 'detail/:id', component: SpacesDetailComponent},
            {path: 'edit/:id', component: SpacseEditComponent}
            
        ]   
    },
];