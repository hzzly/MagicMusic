<template>
    <v-music-list :music-lists="radioLists">
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
            'radioLists'
		])
    },
    created() {
        if (this.radioLists.length == 0) {
            this.$store.dispatch('getRadioLists')
        }
    }
}
</script>