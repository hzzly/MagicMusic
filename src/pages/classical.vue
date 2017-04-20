<template>
    <v-music-list :music-lists="classicalLists">
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
            'classicalLists'
		])
    },
    created() {
        if (this.classicalLists.length == 0) {
            this.$store.dispatch('getClassicalLists')
        }
    }
}
</script>