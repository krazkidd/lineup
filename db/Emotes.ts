import {
    Firestore,
    CollectionReference,
    DocumentData,

    query,
    where,
    orderBy,

    collection,
    onSnapshot,

    addDoc,
} from 'firebase/firestore';

import type { ID, Emote } from '~~/types';

let _db: Firestore;
let _collRef: CollectionReference<Emote>;

export async function getEmotes(db: Firestore) {
    _db = db;

    _collRef = collection(_db, 'emotes').withConverter<Emote, DocumentData>({
        fromFirestore: (snapshot) => {
            // Here you could do validation with a library like zod
            return snapshot.data(
                // this avoids having `null` while the server timestamp is updating
                { serverTimestamps: 'estimate' }
            ) as any
        },
        toFirestore: (data) => data,
    });

    return _collRef;
}

export function addEmote(emote: Emote) {
    return addDoc(_collRef, emote);
}

export function getRecentEmotes(teamId: ID) {
    return query(_collRef, where("teamId", "==", teamId), where("ticks", ">", Date.now()), orderBy("ticks"));
}

export function subscribeToNewEmotes(teamId: ID, callbackFn: Function) {
    return onSnapshot(getRecentEmotes(teamId), (snapshot) => {
        snapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
                callbackFn(change.doc.data());
            }
        });
    });
}
