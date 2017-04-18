<template>
    <v-music-list :music-lists="musicLists">
    </v-music-list>
</template>

<script>

import musicList from '@/components/musicList'

import { mapGetters } from 'vuex'

export default {
    components: {
        'v-music-list': musicList,
    },
    data() {
        return {

        }
    },
    computed: {
        ...mapGetters([
			'musicLists',
		])
    }
}
</script>