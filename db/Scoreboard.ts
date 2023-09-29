import {
    Firestore,
    DocumentReference,
    DocumentData,

    doc,
    getDoc,
    setDoc,
    updateDoc,

    increment,
} from 'firebase/firestore';

import type { ID, Scoreboard } from '~~/types';

let _db: Firestore;
let _docRef: DocumentReference<Scoreboard, DocumentData>;

export async function getScoreboard(db: Firestore, id: ID) {
    _db = db;

    _docRef = doc(_db, 'scoreboards', id).withConverter<Scoreboard, DocumentData>({
        fromFirestore: (snapshot) => {
            // Here you could do validation with a library like zod
            return snapshot.data(
                // this avoids having `null` while the server timestamp is updating
                { serverTimestamps: 'estimate' }
            ) as any
        },
        toFirestore: (data) => data,
    });

    if (!(await getDoc(_docRef)).exists()) {
        setDoc(_docRef, {
            teamScore: 0,
            otherTeamScore: 0,
        } as Scoreboard);
    }

    return _docRef;
}

export function incrementTeamScore(amount: number) {
    return updateDoc(_docRef, {
        teamScore: increment(amount)
    });
}

export function incrementOtherTeamScore(amount: number) {
    return updateDoc(_docRef, {
        otherTeamScore: increment(amount),
    });
}
