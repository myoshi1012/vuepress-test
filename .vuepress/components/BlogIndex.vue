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
                <router-link :to="post.path" class="post-link">
                    <h3>
                        {{ post.frontmatter.title }}
                    </h3>
                </router-link>
                <div class="date">{{formatDate(post.frontmatter.date)}}</div>
            </div>
            <div>
            <p>{{ post.frontmatter.description }}</p>
            
        </div>
        <div slot="footer">
            <vs-row vs-justify="flex-end">
                <!-- add some icons -->
                <router-link :to="post.path"><vs-button type="gradient" color="primary">Read more</vs-button></router-link>
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
            const date =  new Date(datestr)
            return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate()
        }
    }
}
</script>

<style lang="stylus">
.date
    text-align right
.post-link
    color inherit
    text-decoration none !important
    &:hover, &.router-link-active
        color $accentColor
</style>
