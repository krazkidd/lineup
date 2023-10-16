<script setup lang="ts">
import { Timestamp } from 'firebase/firestore';

import type { Team, Emote } from '~~/types';

import { useTeamStore } from '~~/stores/Team';
import { getTeam } from '~~/db/Team'
import { getScoreboard, incrementTeamScore, incrementOtherTeamScore } from '~~/db/Scoreboard'
import { getEmotes, addEmote, subscribeToNewEmotes } from '~~/db/Emotes'

const route = useRoute()
const db = useFirestore();

const teamStore = useTeamStore();

const teamId = computed(() => route.params.id as string || teamStore.id);

const { data: team } = useDocument(await getTeam(db, teamId.value));
const { data: scoreboard } = useDocument(await getScoreboard(db, teamId.value));

const { data: emotes } = useCollection(await getEmotes(db));

const unsubscribe = subscribeToNewEmotes(teamId.value, (data) => {
    //TODO need to chain emote animations and remove after timeout
    currentEmote.value = data.emote;
});

const currentEmote = ref('');

const fakeTeam = {
    name: "Opposing Team",
    //jerseyColor: "",
    //jerseyTextColor: "",
} as Team;
</script>

<template>
    <div>
        <div class="flex justify-end mb-1 px-4">
            <ScoreboardShareButton :teamId="teamId" :team="team!" class="justify-self-end" />
        </div>

        <ScoreboardEmojiButton :id="currentEmote" class="block m-auto" :class="{ invisible: !currentEmote }" />

        <div class="flex flex-col sm:flex-row justify-between items-center text-center mb-4 px-4">
            <ScoreboardTeamTile
                :team="team"
                :score="scoreboard?.teamScore ?? 0"
                :show-buttons="!route.params.id"
                @increment-score="incrementTeamScore($event)"
                class="w-64"
            />

            <ScoreboardInningTile
                :inning="scoreboard?.inning ?? 1"
                :show-buttons="!route.params.id"
                @increment-inning="incrementInning($event)"
                class="text-center grow-0"
            />

            <ScoreboardTeamTile
                :team="fakeTeam"
                :score="scoreboard?.otherTeamScore ?? 0"
                :show-buttons="!route.params.id"
                @increment-score="incrementOtherTeamScore($event)"
                class="w-64"
            />
        </div>

        <ScoreboardEmojiBoard
            @emote="addEmote({ teamId, emote: $event, timestamp: Timestamp.now() } as Emote)"
            :class="{ hidden: !route.params.id }"
            class="px-4"
        />
    </div>
</template>
