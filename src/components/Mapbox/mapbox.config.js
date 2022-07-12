const ridingSource = {
    type: 'vector',
    url: 'mapbox://ellummedia.electoraldistricts',
};
const ridingFillLayer_1 = {
    id: 'riding-fills',
    type: 'fill',
    source: 'election-ridings-source',
    'source-layer': 'electoral-districts',
    layout: {},
    paint: {
        'fill-color': '#051101',
        'fill-opacity': [
            'case',
            ['==', ['feature-state', 'highlightState'], 'hovered'],
            0.7,
            ['==', ['feature-state', 'highlightState'], 'clicked'],
            0.9,
            0.4,
        ],
    },
};
const ridingStrokeLayer_1 = {
    id: 'riding-borders',
    type: 'line',
    source: 'election-ridings-source',
    'source-layer': 'electoral-districts',
    layout: {},
    paint: { 'line-color': '#051101', 'line-width': 4 },
};
const ridingStrokeLayer_2 = {
    id: 'riding-borders-2',
    type: 'line',
    source: 'election-ridings-source',
    'source-layer': 'electoral-districts',
    layout: {},
    paint: { 'line-color': '#fff', 'line-width': 2 },
};

export {
    ridingFillLayer_1,
    ridingSource,
    ridingStrokeLayer_1,
    ridingStrokeLayer_2,
};
