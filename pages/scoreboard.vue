<script setup lang="ts">
import { useTeamStore } from '~~/stores/Team';
import { getTeam } from '~~/db/Team'
import { getScoreboard, incrementTeamScore, incrementOtherTeamScore } from '~~/db/Scoreboard'

const db = useFirestore();
const teamStore = useTeamStore();

const { data: team } = useDocument(await getTeam(db, teamStore.id));
const { data: scoreboard, pending } = useDocument(await getScoreboard(db, teamStore.id));

const buttonPassThroughOptions = {
  label: {
    class: 'hidden'
  }
};
</script>

<template>
    <div class="flex flex-col sm:flex-row justify-around items-center text-center">
        <Card class="m-1 w-64">
            <template #header>
                <span class="text-6xl">{{ scoreboard?.teamScore }}</span>
            </template>
            <template #title>{{ team?.name }}</template>
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

        <Card class="m-1 w-64">
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
