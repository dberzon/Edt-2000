<template>
    <div class="multicolor-background" v-bind:style="styles"></div>
</template>

<script lang="ts">
    import './multicolor-background.scss';
    import Vue from 'vue';
    import { Component } from 'vue-property-decorator';
    import { Actions$ } from '../../../../Shared/actions/actions';
    import { ColorHelper } from '../../../../Shared/colors/converters';
    import { IColor } from '../../../../Shared/colors/types';

    @Component
    export default class MultiColorBackgroundComponent extends Vue {
        public multiColorSubscription: any;

        public styles: Object = {};

        mounted() {
            this.multiColorSubscription = Actions$.vidtMultiColor.subscribe(
                (colors: IColor[]) => {
                    this.setStyles(colors);
                },
            );
        }

        setStyles(colors: IColor[]) {
            const bcgColor = ColorHelper.getRGBString(colors);
            this.styles = {
                background: `${bcgColor}`,
            };
        }

        destroyed() {
            if (typeof this.multiColorSubscription !== 'undefined') {
                this.multiColorSubscription.unsubscribe();
            }
        }
    }
</script>
