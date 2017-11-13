import { AdminSpacseList } from './spaces/list/admin-spacse-list';

export const routes = [
    {
        path: 'admin', children: [
            { path: '', component:  AdminSpacseList}        ]   
    },
];