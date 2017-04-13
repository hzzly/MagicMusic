<template>
    <div class="home">
        <v-banner :image="image"></v-banner>
        
    </div>
</template>

<script>

    import banner from '@/components/banner'

    export default {
        components: {
            'v-banner': banner
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

    }
</style>