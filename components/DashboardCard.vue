<template>
    <Card class="card bezeless">
        <div class="card-header" v-if="title">
            <i v-bind:class="icon"></i>
            <h5>{{ title }}</h5>
        </div>

        <div class="content">
            <slot></slot>
        </div>
    </Card>
</template>

<script>
import Card from "./Card";

export default {
  components: { Card },
  props: [ 'title', 'icon' ]
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/utils';

.card {
    background-color: $bg-color-2;

    /deep/ .inner {
        padding: 0;
    }
}

.card-header {
    background-color: lighten($bg-color-2, 4%);
    padding: $xs-space $grid-gutter-part;
    font-size: 0;

    i, h5 {
        @extend %align-middle;
    }

    i {
        padding-right: $xs-space;

        &:before {
            font-size: $p-font-size;
        }
    }

    h5 {
        text-transform: uppercase;
    }
}
</style>
