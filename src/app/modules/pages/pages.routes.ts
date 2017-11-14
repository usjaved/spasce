import { PrivacyPage } from './privacy/privacy';
import { BlogPage } from './blog/blog';
import { HelpPage } from './help/help';
import { AboutPage } from './about/about';
import { TeamPage } from './team/team';
import { TermPage } from './term/term';



export const routes = [
    {
        path: 'pages', children: [
            { path: 'about-us', component: AboutPage },
            { path: 'help', component: HelpPage },
            { path: 'blog', component: BlogPage },
            { path: 'team', component: TeamPage },
            { path: 'terms-of-service', component: TermPage },
            { path: 'privacy-policy', component: PrivacyPage }

        ]   
    },
];