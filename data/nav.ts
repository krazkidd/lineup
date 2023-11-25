import type { MenuItem } from "primevue/menuitem";

export const homeMenuItem: MenuItem = {
    key: 'home',
    label: 'Home',
    icon: 'pi pi-home pi-fw',
    route: '/'
};
export const lineupMenuItem: MenuItem = {
    key: 'lineup',
    label: 'Lineup',
    icon: 'pi pi-user-edit pi-fw',
    route: '/lineup'
};
export const scoreboardMenuItem: MenuItem = {
    key: 'scoreboard',
    label: 'Scoreboard',
    icon: 'pi pi-play pi-fw',
    route: '/scoreboard'
};
export const aboutMenuItem: MenuItem = {
    key: 'about',
    label: 'About',
    icon: 'pi pi-info-circle pi-fw',
    route: '/about'
};
// export const externalLinkExample: MenuItem = {
//     key: 'external',
//     label: 'External',
//     icon: 'pi pi-external-link pi-fw',
//     url: 'https://site.example',
//     target: '_blank',
// };

export const navMenuItems: MenuItem[] = [
    homeMenuItem,
    lineupMenuItem,
    scoreboardMenuItem,
    aboutMenuItem,
];
