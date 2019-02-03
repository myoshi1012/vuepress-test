<template>
  <header :class="{'shadow':true}" class="navbar">
    <SidebarButton @toggle-sidebar="$emit('toggle-sidebar')"/>
    <div class="con-btns-header">
      <router-link
        :to="$localePath"
        class="home-link"
      >
      <div class="con-logo">
        <img
          class="logo"
          v-if="$site.themeConfig.logo"
          :src="$withBase($site.themeConfig.logo)"
          :alt="$siteTitle"
        >
      </div>
      <span
        ref="siteName"
        class="site-name"
        v-if="$siteTitle"
        :class="{ 'can-hide': $site.themeConfig.logo }"
      >{{ $siteTitle }}</span>
      </router-link>

      <div class="links"
        :style="linksWrapMaxWidth ? {
          'max-width': linksWrapMaxWidth + 'px'
        } : {}"
      >
        <AlgoliaSearchBox
          v-if="isAlgoliaSearch"
          :options="algolia"
        />
        <SearchBox v-else-if="$site.themeConfig.search !== false"/>
        <NavLinks class="can-hide"/>
      </div>
    </div>

    <div class='con-social'>
      <a
        title="Github"
        v-if="repoLink"
        :href="repoLink"
        class="repo-link flaticon-github"
        target="_blank"
        rel="noopener noreferrer">
          <!-- {{ repoLabel }} -->
          <!-- <OutboundLink/> -->
        </a>
        <a target="_blank" title="@shiratamagmag" href="https://twitter.com/shiratamagmag">
          <i class="flaticon-twitter twitterx"></i>
        </a>
    </div>
  </header>
</template>

<script>
import SidebarButton from './SidebarButton.vue'
import AlgoliaSearchBox from '@AlgoliaSearchBox'
import SearchBox from '@SearchBox'
import NavLinks from './NavLinks.vue'

export default {
  components: { SidebarButton, NavLinks, SearchBox, AlgoliaSearchBox },

  data () {
    return {
      linksWrapMaxWidth: null
    }
  },

  mounted () {
    const MOBILE_DESKTOP_BREAKPOINT = 719 // refer to config.styl
    const NAVBAR_VERTICAL_PADDING = parseInt(css(this.$el, 'paddingLeft')) + parseInt(css(this.$el, 'paddingRight'))
    const handleLinksWrapWidth = () => {
      if (document.documentElement.clientWidth < MOBILE_DESKTOP_BREAKPOINT) {
        this.linksWrapMaxWidth = null
      } else {
        this.linksWrapMaxWidth = this.$el.offsetWidth - NAVBAR_VERTICAL_PADDING -
          (this.$refs.siteName && this.$refs.siteName.offsetWidth || 0)
      }
    }
    handleLinksWrapWidth()
    window.addEventListener('resize', handleLinksWrapWidth, false)
  },

  computed: {
    repoLink () {
      const { repo } = this.$site.themeConfig
      if (repo) {
        return /^https?:/.test(repo)
          ? repo
          : `https://github.com/${repo}`
      }
    },

    algolia () {
      return this.$themeLocaleConfig.algolia || this.$site.themeConfig.algolia || {}
    },

    isAlgoliaSearch () {
      return this.algolia && this.algolia.apiKey && this.algolia.indexName
    }
  }
}

function css (el, property) {
  // NOTE: Known bug, will return 'auto' if style value is 'auto'
  const win = el.ownerDocument.defaultView
  // null means not to return pseudo styles
  return win.getComputedStyle(el, null)[property]
}
</script>

<style lang="stylus">
$navbar-vertical-padding = 0.7rem
$navbar-horizontal-padding = 1.5rem

.navbar
  padding 0.4rem 1rem
  line-height $navbarHeight - 1.5rem
  background: $background
  z-index: 1200 !important
  position: fixed
  width: calc(100% + 7px)
  display flex
  align-items center
  justify-content space-between
  //padding $navbar-vertical-padding $navbar-horizontal-padding
  line-height $navbarHeight - 1.4rem

  a, span, img
    display inline-block
  .logo
    height $navbarHeight - 1.4rem
    min-width $navbarHeight - 1.4rem
    margin-right 0.8rem
    vertical-align top
  .site-name
    font-size 1.3rem
    font-weight 600
    color $textColor
    position relative
  .links
    //padding-left 1.5rem
    //box-sizing border-box
    background-color white
    white-space nowrap
    font-size 0.9rem
    //position relative
    //right $navbar-horizontal-padding
    //top $navbar-vertical-padding
    height inherit
    display flex
    .search-box
      flex: 0 0 auto
      vertical-align top
  .con-btns-header
    display flex
    align-items center
    width 100%
    justify-content space-between
    height inherit
  a, span, img

.con-social
  display flex
  align-items center
  justify-content right
  padding-left 20px
  .twitterx
    &:before
      font-size 1.4rem !important
  .repo-link
    &:before
      font-size 1.4rem !important
  a
    display flex !important
    align-items center
    justify-content center
    padding 0px 4px
    transition all .25s ease
    color #5b5777
    &:hover
      color $accentColor !important
      .st0
        fill $accentColor !important

.shadow
  box-shadow 0px 3px 15px 0px rgba(0, 0, 0, 0.09) !important


@media (max-width: $MQMobile)
  .navbar
    padding-left 3rem
    .can-hide
      display none
    .links
      padding-left 1.5rem
</style>
