import { AdminSpacseList } from './spaces/list/admin-spacse-list';
import { AdminRequestList } from './requests/list/admin-request-list';

export const routes = [
    {
        path: 'admin', children: [
            { path: '', component:  AdminSpacseList} ,
            {path:'request',component: AdminRequestList}       ]   
    },
];