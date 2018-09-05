module.exports = `
<div class="blockchain">
    <div class="blockchain__image">
        <div class="blockchain__item blockchain__item--left-top">
            <img v-bind:src="selectedTheme['assets']['leftTop']" />
        </div>
        <div class="blockchain__item blockchain__item--right-top">
            <img v-bind:src="selectedTheme['assets']['leftRight']" />
        </div>
        <div class="blockchain__item blockchain__item--left-bottom">
            <img v-bind:src="selectedTheme['assets']['leftBottom']" />
        </div>
        <div class="blockchain__item blockchain__item--right-bottom">
            <img v-bind:src="selectedTheme['assets']['rightBottom']" />
        </div>
        
    </div>
</div>
`;
