<template>
    <div class="home">
        <v-banner :image="image"></v-banner>
        <v-nav></v-nav>
        <router-view></router-view>
    </div>
</template>

<script>

import banner from '@/components/banner'
import nav from '@/components/nav'

export default {
    components: {
        'v-banner': banner,
        'v-nav': nav,
    },
    data() {
        return {
            image: [
                'http://p4.music.126.net/_Dnld3WEJrGJhu5HnVj80Q==/18824738581025900.jpg',
                'http://p3.music.126.net/zK84D6B5owkHCggrRss5YQ==/19032546276883223.jpg',
                'http://p4.music.126.net/3_iSYvbjOiKeYFmbpYChPA==/18959978509453169.jpg',
                'http://p3.music.126.net/fuGZBbYxyRQX43vrtXe5FA==/19005058486178477.jpg',
                'http://p4.music.126.net/4I-kNYnRSND9I52NSB1AtQ==/19032546276883221.jpg'
            ],
            fixed: false
        }
    },
    created() {
        // this.$router.push('/home/popular')
    },
    mounted() {
        let audioDOM = document.querySelector('audio')
            audioDOM.addEventListener('loadedmetadata', () => {
                this.$store.dispatch('setPlaying', true)
                this.$store.dispatch('setShowPlayLoading', false)
                this.$store.dispatch('getMusicTime', audioDOM.duration)
            })
    }
}
</script>

<style lang="scss" scoped>
.home {
    height: 100%;
    background: #28224e;
}
</style>