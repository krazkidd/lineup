<script setup lang="ts">
import {
    doc,
    increment,
    serverTimestamp,
    Timestamp,
    getDoc,
    setDoc,
    updateDoc,
    DocumentData,
} from 'firebase/firestore';
import { useDocument, useFirestore } from 'vuefire';
import { Scoreboard } from '~/types';

import { useTeamStore } from '~~/stores/Team';

const db = useFirestore();
const teamStore = useTeamStore();

const props = defineProps({
    today: {
        type: String,
        default: () => new Date().toISOString().slice(0, 10),
    },
});

const docRef = doc(db, 'scoreboard', props.today).withConverter<
    Scoreboard,
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
});

if (!(await getDoc(docRef)).exists()) {
    setDoc(docRef, {
        teamScore: 0,
        otherTeamScore: 0,
    });
}

const scoreboardDoc = computed(() => docRef);

const { data: scoreboard, pending } = useDocument(scoreboardDoc);

const buttonPassThroughOptions = {
  label: {
    class: 'hidden'
  }
};

function incrementTeamScore(amount: number) {
    return updateDoc(scoreboardDoc.value, {
        teamScore: increment(amount)
    });
}

function incrementOtherTeamScore(amount: number) {
    return updateDoc(scoreboardDoc.value, {
        otherTeamScore: increment(amount),
    });
}
</script>

<template>
    <div class="flex flex-col sm:flex-row justify-around items-center text-center">
        <Card class="w-64">
            <template #header>
                <span class="text-6xl">{{ scoreboard?.teamScore }}</span>
            </template>
            <template #title>{{ teamStore.teamName }}</template>
            <template #footer>
                <div class="flex justify-around">
                    <Button
                        @click="incrementTeamScore(1)"
                        icon="pi pi-caret-up"
                        severity="success"
                        rounded
                        aria-label="Add Run"
                        title="Add Run"
                        :loading="pending"
                        :pt="buttonPassThroughOptions"
                    />

                    <Button
                        @click="incrementTeamScore(-1)"
                        icon="pi pi-caret-down"
                        severity="danger"
                        rounded
                        outlined
                        aria-label="Remove Run"
                        title="Remove Run"
                        :loading="pending"
                        :pt="buttonPassThroughOptions"
                    />
                </div>
            </template>
        </Card>

        <Card class="w-64">
            <template #header>
                <span class="text-6xl">{{ scoreboard?.otherTeamScore }}</span>
            </template>
            <template #title>Opposing Team</template>
            <template #footer>
                <div class="flex justify-around">
                    <Button
                        @click="incrementOtherTeamScore(1)"
                        icon="pi pi-caret-up"
                        severity="success"
                        rounded
                        aria-label="Add Run"
                        title="Add Run"
                        :loading="pending"
                        :pt="buttonPassThroughOptions"
                    />

                    <Button
                        @click="incrementOtherTeamScore(-1)"
                        icon="pi pi-caret-down"
                        severity="danger"
                        rounded
                        outlined
                        aria-label="Remove Run"
                        title="Remove Run"
                        :loading="pending"
                        :pt="buttonPassThroughOptions"
                    />
                </div>
            </template>
        </Card>
    </div>
</template>

<style scoped>
</style>
