<script setup lang="ts">
import type { Team } from '~~/types';

import { useTeamStore } from '~~/stores/Team';
import { getTeam } from '~~/db/Team'
import { getScoreboard, incrementTeamScore, incrementOtherTeamScore } from '~~/db/Scoreboard'

const route = useRoute()
const db = useFirestore();

const teamStore = useTeamStore();

const teamId = computed(() => route.params.id as string || teamStore.id);

const { data: team } = useDocument(await getTeam(db, teamId.value));
const { data: scoreboard } = useDocument(await getScoreboard(db, teamId.value));

const fakeTeam = {
    name: "Opposing Team",
    //jerseyColor: "",
    //jerseyTextColor: "",
} as Team;
</script>

<template>
    <div>
        <div class="flex justify-end mb-1">
            <ScoreboardShareButton :teamId="teamId" :team="team!" class="justify-self-end" />
        </div>

        <div class="flex flex-col sm:flex-row justify-around items-center text-center">
            <ScoreboardTeamTile
                :team="team"
                :score="scoreboard?.teamScore ?? 0"
                :show-buttons="!route.params.id"
                @add-run="incrementTeamScore(1)"
                @remove-run="incrementTeamScore(-1)"
                class="m-1 w-64"
            />

            <ScoreboardTeamTile
                :team="fakeTeam"
                :score="scoreboard?.otherTeamScore ?? 0"
                :show-buttons="!route.params.id"
                @add-run="incrementOtherTeamScore(1)"
                @remove-run="incrementOtherTeamScore(-1)"
                class="m-1 w-64"
            />
        </div>
    </div>
</template>

<style scoped>
</style>
