export interface IPhotoAsset {
    name: string;
    src: string;
}

export const photoAssets: IPhotoAsset[] = [
    {
        name: 'Barbie',
        src: 'barbie.jpg'
    },
    {
        name: 'Barbiesex',
        src: 'barbiesex.jpg'
    },
    {
        name: 'Cabriolet',
        src: 'cabriolet.jpg'
    },
    {
        name: 'Doe maar',
        src: 'doe-maar.jpg'
    },
    {
        name: 'Gigi dagustino',
        src: 'gigidagustino.jpg'
    },
    {
        name: 'Monkey',
        src: 'monkey.jpg'
    },
    {
        name: 'Nerd',
        src: 'nerd.jpg'
    },
    {
        name: 'Powerrangers',
        src: 'powerrangers.jpg',
    },
    {
        name: 'Strobocops',
        src: 'strobocops.jpg'
    },
    {
        name: 'Zelda',
        src: 'zelda.jpg'
    }
];

export interface IVideoAsset {
    name: string,
    src: string,
    overlay: boolean;
}

export const videoAssets: IVideoAsset[] = [
    {
        name: 'Lights of Orion',
        src: 'lights-of-orion.mp4',
        overlay: true
    },
    {
        name: 'Mr. Nielson',
        src: 'video-kat.mp4',
        overlay: false
    }
];

export interface IBlockchainAsset {
    leftTop: string[];
    rightTop: string[];
    leftBottom: string[];
    rightBottom: string[];
}

export interface IBlockchainTheme {
    name: string;
    assets: IBlockchainAsset;
}

export const blockchainThemes: IBlockchainTheme[] = [{
    name: 'theme1',
    assets: {
        leftTop: ['steven-1.jpg', 'alain-1.jpg', 'jorinde-1.jpg', 'edwin-1.jpg', 'kat-1.jpg'],
        rightTop: ['steven-2.jpg', 'alain-2.jpg', 'jorinde-2.jpg', 'edwin-2.jpg', 'kat-2.jpg'],
        leftBottom: ['steven-3.jpg', 'alain-3.jpg', 'jorinde-3.jpg', 'edwin-3.jpg', 'kat-3.jpg'],
        rightBottom: ['steven-4.jpg', 'alain-4.jpg', 'jorinde-4.jpg', 'edwin-4.jpg', 'kat-4.jpg']
    }
}];
