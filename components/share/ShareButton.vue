<script setup lang="ts">
import { scoreboardMenuItem } from '~~/nav';
import type { ID, Team } from '~~/types';

const props = defineProps<{
    teamId: ID
    team: Team
}>();

const buttonPassThroughOptions = {
  label: {
    class: 'hidden'
  }
};

const isDialogVisible = ref(false);
</script>


<template>
    <Button
        @click="isDialogVisible = true"
        icon="pi pi-fw pi-share-alt"
        severity="secondary"
        text
        rounded
        aria-label="Share"
        title="Share"
        :pt="buttonPassThroughOptions"
    />

    <Dialog
        v-model:visible="isDialogVisible"
        modal
        :header="`${team.name}'s Scoreboard`"
        :pt="{
            root: { class: 'w-full md:w-3/4 xl:w-1/2' },
            content: { class: 'pt-1' }
        }"
    >
        <RouterLink :to="scoreboardMenuItem.to!" v-slot="{ href, route, navigate, isActive, isExactActive }" custom>
            <a :href="href.concat('/', props.teamId)" v-bind="props.action" @click="navigate" class="block">
                <VueQrcode
                    :value="href.concat('/', props.teamId)"
                    type="image/png"
                    :color="{ dark: '#000000ff', light: '#ffffffff' }"
                    class="block mx-auto"
                />
            </a>
    </RouterLink>
    </Dialog>
</template>
