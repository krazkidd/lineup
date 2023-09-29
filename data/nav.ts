import type { MatcherLocationAsPath } from "#vue-router";
import type { MenuItem } from "primevue/menuitem";

export const homeMenuItem: MenuItem = {
    key: 'home',
    label: 'Home',
    icon: 'pi pi-fw pi-home',
    //TODO deprecated
    to: { path: '/' } as MatcherLocationAsPath
};
export const lineupMenuItem: MenuItem = {
    key: 'lineup',
    label: 'Lineup',
    icon: 'pi pi-fw pi-user-edit',
    //TODO deprecated
    to: { path: '/lineup' } as MatcherLocationAsPath
};
export const scoreboardMenuItem: MenuItem = {
    key: 'scoreboard',
    label: 'Scoreboard',
    icon: 'pi pi-fw pi-play',
    //TODO deprecated
    to: { path: '/scoreboard' } as MatcherLocationAsPath
};

export const navMenuItems: MenuItem[] = [
    homeMenuItem,
    lineupMenuItem,
    scoreboardMenuItem,
];
