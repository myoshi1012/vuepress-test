<template>
  <div>
    aaaa
    <vs-buttom type='filled' v-for="tag in $tags" :key="tag" :slug="tag" >#{{tag}}</vs-buttom>
  </div>

</template>
<script>
import Tag from '../components/Tag';
//import PostTime from './components/PostTime';
export default {
  components: {
    Tag,
    //PostTime
  },
  computed: {
    tagName() {
      return this.$route.params.tagName;
    },
    pageList() {
      return this.$blog.tags[this.tagName];
    }
  }
};
</script>
<style lang="stylus">
.list-inline-time {
  min-width: 120px;
  width: 200px !important;
}
</style>
