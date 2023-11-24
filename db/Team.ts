import {
    Firestore,
    DocumentReference,

    doc,
    getDoc,
    setDoc,
    updateDoc,
} from 'firebase/firestore';
import type { DocumentData } from 'firebase/firestore';

import type { ID, Team } from '~~/types';

let _db: Firestore;
let _docRef: DocumentReference<Team, DocumentData>;

export async function getTeam(db: Firestore, id: ID) {
    _db = db;

    _docRef = doc(_db, 'teams', id).withConverter<Team, DocumentData>({
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
            id,

            name: '',
            jerseyColor: 'f47373',
            jerseyTextColor: '000000',
        } as Team);
    }

    return _docRef;
}

export function setTeamName(name: string) {
    return updateDoc(_docRef, {
        name
    });
}

export function setJerseyColor(jerseyColor: string) {
    return updateDoc(_docRef, {
        jerseyColor,
    });
}

export function setJerseyTextColor(jerseyTextColor: string) {
    return updateDoc(_docRef, {
        jerseyTextColor,
    });
}
