<script setup lang="ts">
import { getScoreboard, incrementTeamScore, incrementOtherTeamScore } from '~~/db/Scoreboard'
import { useTeamStore } from '~~/stores/Team';

const teamStore = useTeamStore();

const props = defineProps({
    today: {
        type: Date,
        default: () => new Date(),
    },
});

const { scoreboard, pending } = await getScoreboard(useFirestore(), props.today);

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
