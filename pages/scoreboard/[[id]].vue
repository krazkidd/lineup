<script setup lang="ts">
import { useTeamStore } from '~~/stores/Team';
import { getTeam } from '~~/db/Team'
import { getScoreboard, incrementTeamScore, incrementOtherTeamScore } from '~~/db/Scoreboard'

const route = useRoute()
const db = useFirestore();

const teamStore = useTeamStore();

const teamId = computed(() => route.params.id as string || teamStore.id);

const { data: team } = useDocument(await getTeam(db, teamId.value));
const { data: scoreboard, pending } = useDocument(await getScoreboard(db, teamId.value));

const buttonPassThroughOptions = {
  label: {
    class: 'hidden'
  }
};
</script>

<template>
    <div>
        <div class="flex font-bold mb-4">
            <div
                class="grow inline-block px-1"
            />

            <ShareButton :teamId="teamId" :team="team!" />
        </div>

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
    </div>
</template>

<style scoped>
</style>
