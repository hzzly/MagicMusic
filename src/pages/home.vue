<template>
    <div class="home">
        <v-banner :image="image"></v-banner>
        <v-nav></v-nav>
        <v-music-list></v-music-list>
        <v-play></v-play>
    </div>
</template>

<script>

    import banner from '@/components/banner'
    import nav from '@/components/nav'
    import musicList from '@/components/musicList'
    import play from '@/components/play'

    export default {
        components: {
            'v-banner': banner,
            'v-nav': nav,
            'v-music-list': musicList,
            'v-play': play,
        },
        data () {
            return {
                image: [
                    'static/img/1-1.jpg',
                    'static/img/1-2.jpg', 
                    'static/img/1-3.jpg', 
                    'static/img/1-4.jpg', 
                    'static/img/1-5.jpg'
                ],
            }
        }
    }
</script>

<style lang="scss" scoped>
    .home {
        height: 100%;
        background: #28224e;
    }
</style>