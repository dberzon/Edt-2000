import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { IColor } from '../../../../../Shared/helpers/types';
import { Actions$ } from '../../../../../Shared/actions';
import { ColorHelper } from '../../../../../Shared/helpers/hsv-2-rgb';

@Component({
    name: 'color-background',
    template: require('./color-background.template'),
    components: {},
})
export class ColorBackgroundComponent extends Vue {
    public singleColorSubscription: any;
    public multiColorSubscription: any;

    public styles: Object = {};

    mounted() {
        this.singleColorSubscription = Actions$.vidtSingleColor.subscribe(
            (color: IColor) => {
                this.setStyles([color]);
            },
        );

        this.multiColorSubscription = Actions$.vidtMultiColor.subscribe(
            (colors: IColor[]) => {
                this.setStyles(colors);
            },
        );
    }

    setStyles(colors: IColor[]) {
        const bcgColor = ColorHelper.getRGBString(colors);
        this.styles = {
            background: `${bcgColor}`
        };
    }

    destroyed() {
        if (typeof this.singleColorSubscription !== 'undefined') {
            this.singleColorSubscription.unsubscribe();
        }

        if (typeof this.multiColorSubscription !== 'undefined') {
            this.multiColorSubscription.unsubscribe();
        }
    }
}
