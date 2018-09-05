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
    private themes = blockchainThemes;

    private selectedTheme: IBlockchainTheme = this.themes[0];
    private theme: string = 'theme1';

    mounted() {
        console.log('theme 1', this.themes[0]);
        this.selectedTheme = this.themes.find(item => item.name === this.theme) || this.themes[0];
        console.log(this.selectedTheme);
        this.setAssets();
    }

    setAssets() {
        //set images in html
        //randoize
    }
}
