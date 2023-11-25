import { Timestamp } from 'firebase/firestore';
import { groupBy, keys } from 'lodash-es';

export type ID = string;

export enum Position {
    DH = "DH",
    P = "P",
    C = "C",
    F = "F",
    S = "S",
    T = "T",
    SS = "SS",
    LF = "LF",
    LC = "LC",
    RF = "RF",
    RC = "RC"
};

export interface Player {
    id: ID;

    name: string;
    number: string;
};

export interface Spot {
    player: Player;
    position: Position;
};

export type Lineup = Spot[];

export interface Team {
    id: string;
    name: string;
    jerseyColor: string,
    jerseyTextColor: string,
};

export interface Scoreboard {
    teamScore: number,
    otherTeamScore: number,
    inning: number,
};

export interface Emote {
    teamId: ID,
    emote: string,
    timestamp: Timestamp
};

//TODO this can probably be refactored into something more readable
const groupedPositions = groupBy(Object.values(Position).filter(p => typeof p === 'string'), p => getPositionGroupName(p));
export const PositionOptions = keys(groupedPositions).map(groupName => ({
    groupName,
    children: groupedPositions[groupName].map(value => ({
        value,
        shortName: getPositionShortName(value),
        longName: getPositionLongName(value)
    }))
}));

export function getPositionShortName(position: Position): string {
    switch (position) {
        case Position.DH:
            return 'DH';

        case Position.P:
            return 'P';

        case Position.C:
            return 'C';

        case Position.F:
            return '1B';

        case Position.S:
            return '2B';

        case Position.T:
            return '3B';

        case Position.SS:
            return 'SS';

        case Position.LF:
            return 'LF';

        case Position.LC:
            return 'LC';

        case Position.RF:
            return 'RF';

        case Position.RC:
            return 'RC';
    }
}

export function getPositionLongName(position: Position): string {
    switch (position) {
        case Position.DH:
            return 'Designated Hitter';

        case Position.P:
            return 'Pitcher';

        case Position.C:
            return 'Catcher';

        case Position.F:
            return 'First Base';

        case Position.S:
            return 'Second Base';

        case Position.T:
            return 'Third Base';

        case Position.SS:
            return 'Short Stop';

        case Position.LF:
            return 'Left Field';

        case Position.LC:
            return 'Left Center Field';

        case Position.RF:
            return 'Right Field';

        case Position.RC:
            return 'Right Center Field';
    }
}

export function getPositionGroupName(position: Position): string {
    switch (position) {
        case Position.DH:
            return 'Substitute';

        case Position.P:
        case Position.C:
            return 'Battery';

        case Position.F:
        case Position.S:
        case Position.T:
        case Position.SS:
            return 'Infield';

        case Position.LF:
        case Position.LC:
        case Position.RF:
        case Position.RC:
            return 'Outfield';
    }
}