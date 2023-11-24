import type { MatcherLocationAsPath } from "vue-router";
import type { MenuItem } from "primevue/menuitem";

export const homeMenuItem: MenuItem = {
    key: 'home',
    label: 'Home',
    icon: 'pi pi-home pi-fw',
    //TODO deprecated
    to: { path: '/' } as MatcherLocationAsPath
};
export const lineupMenuItem: MenuItem = {
    key: 'lineup',
    label: 'Lineup',
    icon: 'pi pi-user-edit pi-fw',
    //TODO deprecated
    to: { path: '/lineup' } as MatcherLocationAsPath
};
export const scoreboardMenuItem: MenuItem = {
    key: 'scoreboard',
    label: 'Scoreboard',
    icon: 'pi pi-play pi-fw',
    //TODO deprecated
    to: { path: '/scoreboard' } as MatcherLocationAsPath
};
export const aboutMenuItem: MenuItem = {
    key: 'about',
    label: 'About',
    icon: 'pi pi-info-circle pi-fw',
    //TODO deprecated
    to: { path: '/about' } as MatcherLocationAsPath
};

export const navMenuItems: MenuItem[] = [
    homeMenuItem,
    lineupMenuItem,
    scoreboardMenuItem,
    aboutMenuItem
];
