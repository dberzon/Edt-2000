import * as _ from 'lodash';
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { blockchainThemes, IBlockchainTheme } from '../../../../../Shared/assets';

@Component({
    name: 'blockchain',
    template: require('./blockchain.template'),
    components: {
    }
})

export class BlockchainComponent extends Vue {
    private themes: IBlockchainTheme[] = blockchainThemes;

    private selectedAssets: IBlockchainTheme|undefined;
    private theme: string = 'theme1';

    mounted() {
        this.selectedAssets = _.find(this.themes, ['name', this.theme]);

        if(!this.selectedAssets) {
            return;
        }

        this.setAssets();
    }

    setAssets() {
        //set images in html
        //randoize
    }
}
