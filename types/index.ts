export type ID = string;

export enum Position {
    DH = 0,
    P,
    C,
    F,
    S,
    T,
    SS,
    LF,
    LC,
    RF,
    RC
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
