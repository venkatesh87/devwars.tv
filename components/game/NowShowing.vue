<template>
  <HomeCard title="Live Now">
    <div class="live-now" slot="heading">
      <h2 class="live-now__title">Live Now</h2>
    </div>

    <div class="now-showing">
      <div class="embed-video">
        <iframe src="https://player.twitch.tv/?channel=devwars" frameborder="0" allowfullscreen="true" scrolling="no" theme="dark" autoplay="true" muted="true"></iframe>
      </div>
    </div>

    <div slot="actions">
      <a href="https://www.twitch.tv/devwars" class="btn btn-twitch" target="_blank">Watch on Twitch</a>
      <RegistrationButton :game="game" />
    </div>
  </HomeCard>
</template>

<script>
  import Component, {State} from 'nuxt-class-component';
  import Vue from 'vue';
  import HomeCard from "@/components/HomeCard";
  import RegistrationButton from "./RegistrationButton";

  @Component({
    components: { HomeCard, RegistrationButton }
  })

  export default class extends Vue {
    @State(state => state.game.active) game;
  }
</script>

<style lang="scss" scoped>
@import '../../assets/styles/utils';

.now-showing {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    width: 100%;
}

.embed-video {
    width: 100%;
    max-width: 350px;
    margin: 0 auto;

    @include breakpoint(xs) {
        max-width: none;
    }
}

/deep/ .card__title {
    display: flex;
    align-items: center;

    &:before {
        content: '';
        width: 14px;
        height: 14px;
        border-radius: 50%;
        margin-right: $xs-space;
        background-color: red;
    }
}
</style>
