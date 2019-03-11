<template>
<div>
    <!-- <div v-for="post in posts">
        <h2>
            <router-link :to="post.path">{{ post.frontmatter.title }}</router-link>
        </h2>
        
        <p>{{ post.frontmatter.description }}</p>

        <p><router-link :to="post.path">Read more</router-link></p>
    </div> -->

    <vs-row vs-justify="center">
        <vs-col v-for="(post, i) in posts" :key="i" :frontmatter="post.frontmatter" type="flex" vs-justify="center" vs-align="center" vs-w="12">
            <vs-card>
                <!-- <vs-card fixedHeight> -->
                <div slot="header">
                    <h3>
                <router-link :to="post.path" class="post-title">
                        {{ post.frontmatter.title }}
                </router-link>
                    </h3>
                <div class="date">{{formatDate(post.frontmatter.date)}}</div>
                </div>
                <div>
                <p>{{ post.frontmatter.description }}</p>
            
                </div>
                <div slot="footer">
                    <vs-row vs-justify="flex-end">
                        <!-- add some icons -->
                        <router-link :to="post.path"><vs-button size="medium" type="gradient" color="primary">Read more</vs-button></router-link>
                    </vs-row>
                </div>
            </vs-card>
        </vs-col>
    </vs-row>
</div>
</template>

<script>
export default {
    computed: {
        posts() {
            var regex = /\d{4}\/\d{2}\/\d{2}/;
            return this.$site.pages
                .filter(x => (x.path.match(regex) && !x.frontmatter.blog_index))
                .sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date));
        }
    },
    methods: {
        formatDate(datestr) {
            const moment = require('moment')
            const date = moment(datestr, "YYYY-MM-DD")
            return date.format("MMMM DD YYYY")
        }
    }
}
</script>

<style lang="stylus">
.date
    text-align right

.post-title
    display inline-block
    color inherit
    text-decoration none !important
    &:after
        display block
        position relative
        content ""
        background-color $accentColor
        left 50%
        transform: translate(-50%)
        height 1.3px
        width 0px
        transition all .2s ease-out
    &:hover:after
        transition width .2s ease-out
        width 90%
    a
        text-decoration none

</style>
