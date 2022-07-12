import React, { useRef, useEffect, useState, useCallback } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import 'mapbox-gl/dist/mapbox-gl.css';
import {
    ridingStrokeLayer_1,
    ridingStrokeLayer_2,
    ridingFillLayer_1,
    ridingSource,
} from './mapbox.config';
import { AnimatePresence, motion } from 'framer-motion';

mapboxgl.accessToken =
    'pk.eyJ1IjoiZWxsdW1tZWRpYSIsImEiOiJja3NqZDAwcmgyY292MnVxdGh2OGhxNWo2In0.YjRLwHMlMbkahupU0I6alg';

const useMapbox = (mapContainerRef, onClickRiding, onHover) => {
    const mapRef = useRef(null);
    const hoveredStateId = useRef(null);
    const clickedStateId = useRef(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        let map = mapRef.current;
        if (map) return; // initialize map only once
        map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/ellummedia/cksjd1ymfko0t17lymmysqbwd',
            center: [-96, 58],
            zoom: 3,
        });

        //disable movement
        map.dragRotate.disable();
        map.touchZoomRotate.disableRotation();

        map.on('load', () => {
            map.addSource('election-ridings-source', ridingSource);
            map.addLayer(ridingFillLayer_1);
            map.addLayer(ridingStrokeLayer_1);
            map.addLayer(ridingStrokeLayer_2);

            // When the user moves their mouse over the Electoral Districts Fill layer, we'll update the
            // feature state for the feature under the mouse.
            map.on('mousemove', 'riding-fills', (e) => {
                if (e.features.length > 0) {
                    //if there's a riding under the mouse
                    if (
                        hoveredStateId.current && //last hovered riding exists
                        hoveredStateId.current !== clickedStateId.current && //and last hovered riding is not the clicked riding
                        e.features[0].id !== hoveredStateId.current //and riding under the mouse is not the last hovered riding
                    ) {
                        //mouse moved from last hovered riding to a new riding, reset the last riding
                        map.setFeatureState(
                            {
                                source: 'election-ridings-source',
                                sourceLayer: 'electoral-districts',
                                id: hoveredStateId.current,
                            },
                            { highlightState: '' }
                        );
                    }

                    //update the hovered riding when the mouse moves over a new riding
                    if (e.features[0].id !== hoveredStateId.current) {
                        onHover(e.features[0].properties);
                    }

                    //set the new hovered riding
                    hoveredStateId.current = e.features[0].id;

                    if (hoveredStateId.current !== clickedStateId.current) {
                        //if the new hovered riding is not the clicked riding
                        //set the new hovered riding state to 'hover'
                        map.setFeatureState(
                            {
                                source: 'election-ridings-source',
                                sourceLayer: 'electoral-districts',
                                id: hoveredStateId.current,
                            },
                            { highlightState: 'hovered' }
                        );
                    }
                }
            });

            map.on('mouseleave', 'riding-fills', () => {
                if (
                    hoveredStateId.current &&
                    hoveredStateId.current !== clickedStateId.current
                ) {
                    map.setFeatureState(
                        {
                            source: 'election-ridings-source',
                            sourceLayer: 'electoral-districts',
                            id: hoveredStateId.current,
                        },
                        { highlightState: '' }
                    );
                }
                hoveredStateId.current = null;
                onHover(null);
            });
            map.on('idle', function () {
                map.resize();
            });
            map.on('click', 'riding-fills', (e) => {
                if (
                    e.features.length > 0 &&
                    e.features[0].id !== clickedStateId.current //if a new riding is clicked
                ) {
                    //if there's already a clicked riding, reset it
                    if (clickedStateId.current) {
                        map.setFeatureState(
                            {
                                source: 'election-ridings-source',
                                sourceLayer: 'electoral-districts',
                                id: clickedStateId.current,
                            },
                            { highlightState: '' }
                        );
                    }
                    //set the new clicked riding
                    clickedStateId.current = e.features[0].id;

                    //set the new clicked riding highlight state to "clicked"
                    map.setFeatureState(
                        {
                            source: 'election-ridings-source',
                            sourceLayer: 'electoral-districts',
                            id: clickedStateId.current,
                        },
                        { highlightState: 'clicked' }
                    );

                    //log riding properties
                    const features = map.queryRenderedFeatures(e.point, {
                        layers: ['riding-fills'],
                    });
                    onClickRiding(features[0].properties);
                }
            });
            map.once('idle', (e) => {
                setLoaded(true);
            });
        });
    }, [onClickRiding, onHover, mapContainerRef]);

    return loaded;
};

const Mapbox = ({ onClickRiding }) => {
    const mapContainerRef = useRef(null);
    const [hoveredRiding, setHoveredRiding] = useState(null);

    const onHover = useCallback((riding) => {
        setHoveredRiding(riding);
    }, []);

    const loaded = useMapbox(mapContainerRef, onClickRiding, onHover);

    return (
        <div className="relative w-full h-full">
            <div className={`w-full h-full`} ref={mapContainerRef} />
            <AnimatePresence>
                {!loaded && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 w-full h-full pointer-events-none bg-brand-neutral-25"
                        transition={{ duration: 0.3 }}
                        style={{ zIndex: 1 }}
                    ></motion.div>
                )}
            </AnimatePresence>
            {hoveredRiding && (
                <div className="absolute px-3 py-1 rounded-md pointer-events-none bg-opacity-40 bottom-12 left-12 lg:bottom-16 lg:left-16 2xl:bottom-20 2xl:left-20 bg-brand-black">
                    <h1 className="z-50 text-xl pointer-events-none font-body text-brand-white ">
                        {hoveredRiding.ENNAME.replace(/--/g, '–')}
                    </h1>
                </div>
            )}
        </div>
    );
};

export default Mapbox;
