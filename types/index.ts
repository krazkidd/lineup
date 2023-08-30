export type ID = string;

export interface Lineup {
    id: ID;
    teamName: string;
    spots: Player[];
};

export interface Player {
    id: ID;
    name: string;
    number: string;
};