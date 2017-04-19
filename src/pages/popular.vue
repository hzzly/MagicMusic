<template>
    <v-music-list :music-lists="popularLists">
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
            'popularLists'
		])
    },
    created() {
        if (this.popularLists.length == 0) {
            this.$store.dispatch('getPopularLists')
        }
    }
}
</script>