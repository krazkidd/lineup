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

export interface Lineup {
    id: ID;
    teamName: string;
    spots: Spot[];
};
