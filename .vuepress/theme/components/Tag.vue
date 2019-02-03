
<template>
  <!-- <router-link :to="to" :tag="key">
    <vs-button type="filled">
      <slot>{{slug}}</slot>
    </vs-button>
  </router-link> -->
      <vs-button type="filled">
      <slot>{{slug}}</slot>
    </vs-button>
</template>
<script>
export default {
  props: {
    slug: String,
    tag: String
  },
  computed: {
    to() {
      const tags = $tags
      return tags && tags.path ? tags.path.replace(':tagName', this.slug) : '';
    }
  }
};
</script>
<style lang="stylus">
//@import '../styles/config.styl';
</style>
