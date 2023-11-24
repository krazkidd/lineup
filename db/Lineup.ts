import {
    Firestore,
    DocumentReference,

    doc,
    getDoc,
    setDoc,
    updateDoc,
} from 'firebase/firestore';
import type { DocumentData } from 'firebase/firestore';

import type { ID, Lineup, Spot } from '~~/types';

let _db: Firestore;
let _docRef: DocumentReference<{ spots: Lineup }, DocumentData>;

export async function getLineup(db: Firestore, id: ID) {
    _db = db;

    _docRef = doc(_db, 'lineups', id).withConverter<{ spots: Lineup }, DocumentData>({
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
            spots: [] as Lineup
        });
    }

    return _docRef;
}

export async function setLineup(lineup: Lineup) {
    return updateDoc(_docRef, {
        spots: [...lineup]
    });
}

export function updateSpot(lineup: Lineup, spot: Spot) {
    let newLineup = [...lineup];

    let playerIndex = newLineup.findIndex(s => s.player.id === spot.player.id);

    newLineup[playerIndex] = {
        player: { ...spot.player },
        position: spot.position
    };

    return updateDoc(_docRef, {
        spots: newLineup
    });
}

export function addSpot(lineup: Lineup, spot: Spot) {
    return updateDoc(_docRef, {
        spots: [
            ...lineup,
            {
                player: { ...spot.player },
                position: spot.position
            }
        ]
    });
}

export function removeSpot(lineup: Lineup, playerId: ID) {
    return updateDoc(_docRef, {
        spots: lineup.filter(s => s.player.id !== playerId)
    });
}
