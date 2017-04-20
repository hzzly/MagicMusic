<template>
    <v-music-list :music-lists="lightLists">
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
            'lightLists'
		])
    },
    created() {
        if (this.lightLists.length == 0) {
            this.$store.dispatch('getLightLists')
        }
    }
}
</script>