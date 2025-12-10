        // --- CONFIG ---
        const COLORS = {
            continent: '#FFBF00', // Amber
            country:   '#FFAC1C', // Dark Amber
            region:    '#F28C28'  // Orange
        };

        const map = L.map('map', {
            center: [20, 0],
            zoom: 2,
            zoomControl: false,
            scrollWheelZoom: false,
            doubleClickZoom: false,
            attributionControl: false
        });

        // Use a high-availability simple basemap
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', { maxZoom: 19 }).addTo(map);

        const locText = document.getElementById('location-text');
        const subText = document.getElementById('sub-text');

        // Mapping: IP-API Code -> Natural Earth Continent Name
        const continentMap = {
            "NA": "North America", "SA": "South America", "EU": "Europe",
            "AS": "Asia", "AF": "Africa", "OC": "Oceania", "AN": "Antarctica"
        };

        // Helper: Fetch
        async function fetchJson(url) {
            const r = await fetch(url);
            if (!r.ok) throw new Error("File not found");
            return r.json();
        }

        async function init() {
            try {
                // 1. IP Detection
                locText.innerText = "Locating...";
                const ip = await fetchJson('https://ipwho.is/');
                if(!ip.success) throw new Error("IP Check Failed");

                const { continent_code, country_code, region, country } = ip;
                const targetContinent = continentMap[continent_code]; // e.g. "Europe"

                console.log(`Target: ${targetContinent} > ${country} (${country_code}) > ${region}`);

                // 2. Fetch DATA
                locText.innerText = "Loading Maps...";
                
                // SINGLE Reliable Source for World Borders (Natural Earth hosted on GitHub)
                // We will use this ONE file to draw both Continent and Country.
                const worldUrl = 'https://raw.githubusercontent.com/martynafford/natural-earth-geojson/master/110m/cultural/ne_110m_admin_0_countries.json';
                
                // Fetch Region Shape (OSM/Nominatim)
                // request polygon_geojson=1 to get the shape
                const regionUrl = `https://nominatim.openstreetmap.org/search.php?q=${region},+${country}&polygon_geojson=1&format=json`;

                const [worldData, regionData] = await Promise.all([
                    fetchJson(worldUrl),
                    fetchJson(regionUrl)
                ]);

                // 3. Process Features
                
                // A. Create Continent Layer (Filter world data for all countries in this continent)
                // This guarantees the continent shape always works without a separate file.
                const continentFeatures = worldData.features.filter(f => f.properties.CONTINENT === targetContinent);
                
                // B. Find Specific Country
                const countryFeature = worldData.features.find(f => f.properties.ISO_A2 === country_code);

                // C. Find Region
                const regionResult = regionData[0];
                if(!regionResult) throw new Error("Region shape not found");

                // Correct Pin Location: Use the Region's geometric center (not IP city)
                const regionCenter = [parseFloat(regionResult.lat), parseFloat(regionResult.lon)];

                // 4. Run Animation
                runSequence(continentFeatures, countryFeature, regionResult, regionCenter, targetContinent, country, region);

            } catch (e) {
                console.error(e);
                locText.innerText = "Error";
                subText.innerText = "Reload Page";
            }
        }

        function runSequence(contFeatures, countryFeat, regionData, regionCenter, cName, cntName, rName) {
            
            // Phase 1: World
            locText.innerText = "Earth";
            subText.innerText = "Zooming...";

            setTimeout(() => {

                // Phase 2: Continent (Draw all countries in continent as one block)
                locText.innerText = cName;
                subText.innerText = "Continent";

                const contLayer = L.geoJSON({ type: "FeatureCollection", features: contFeatures }, {
                    style: { color: COLORS.continent, fillColor: COLORS.continent, weight: 1, fillOpacity: 0.4 },
                    interactive: false
                }).addTo(map);

                // Fly to continent bounds
                map.flyToBounds(contLayer.getBounds(), { duration: 2.0, padding: [20, 20] });

                setTimeout(() => {

                    // Phase 3: Country (Draw on top)
                    locText.innerText = cntName;
                    subText.innerText = "Country";

                    if(countryFeat) {
                        const countryLayer = L.geoJSON(countryFeat, {
                            style: { color: COLORS.country, fillColor: COLORS.country, weight: 2, fillOpacity: 0.5 }
                        }).addTo(map);
                        
                        map.flyToBounds(countryLayer.getBounds(), { duration: 2.0, padding: [50, 50] });
                    }

                    setTimeout(() => {

                        // Phase 4: Region
                        locText.innerText = rName;
                        subText.innerText = "Region";

                        const regionLayer = L.geoJSON(regionData.geojson, {
                            style: { color: COLORS.region, fillColor: COLORS.region, weight: 3, fillOpacity: 0.6 }
                        }).addTo(map);

                        map.flyToBounds(regionLayer.getBounds(), { duration: 2.5, maxZoom: 9 });

                        // Final Pin
                        setTimeout(() => {
                            L.marker(regionCenter).addTo(map);
                            subText.innerText = "Found";
                            
                            // Enable User Interaction
                            map.scrollWheelZoom.enable();
                            map.doubleClickZoom.enable();
                        }, 2500);

                    }, 2500);

                }, 2500);

            }, 1000);
        }

        init();