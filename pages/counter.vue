<script setup lang="ts">
import {
    doc,
    increment,
    serverTimestamp,
    Timestamp,
    setDoc,
    updateDoc,
    DocumentData,
} from 'firebase/firestore';
import { useDocument, useFirestore } from 'vuefire';

import { useTeamStore } from '~~/stores/Team';

const db = useFirestore();
const appSettingsStore = useTeamStore();

const props = defineProps({
    today: {
        type: String,
        default: () => new Date().toISOString().slice(0, 10),
    },
});

const todaysCountDoc = computed(() =>
    doc(db, 'count', props.today).withConverter<
        { when: Timestamp; n: number },
        DocumentData
    >({
        fromFirestore: (snapshot) => {
            // Here you could do validation with a library like zod
            return snapshot.data(
                // this avoids having `null` while the server timestamp is updating
                { serverTimestamps: 'estimate' }
            ) as any
        },
        toFirestore: (data) => data,
    })
);

const { data: count, pending } = useDocument(todaysCountDoc);

function incrementCount() {
    if (count.value) {
        return updateDoc(todaysCountDoc.value, {
            // increment is a special value that enables increments
            n: increment(1),
            // serverTimestamp is a special value that sets the current time
            when: serverTimestamp(),
        });
    } else {
        return setDoc(todaysCountDoc.value, {
            n: 0,
            when: serverTimestamp(),
        });
    }
}
</script>

<template>
    <div>
        <Button
            @click="incrementCount"
            icon="pi pi-plus-circle"
            severity="secondary"
            aria-label="Count"
            title="Count"
            :label="count ? count.n.toString() : 'Click to start today\'s count!'"
            :loading="pending"
        />
    </div>
</template>

<style scoped>
</style>
