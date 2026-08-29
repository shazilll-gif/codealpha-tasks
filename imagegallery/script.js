/**
 * Wonders of the World — 3D Earth & Landscape Gallery
 * Powered by Three.js & GSAP
 */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. Dataset: 10+ Nations & Exact, Verified Natural Landscapes ---
  const wondersData = [
    {
      id: 1,
      country: "Pakistan",
      flag: "🇵🇰",
      title: "K2: The Savage Mountain",
      location: "Karakoram Range, Gilgit-Baltistan, Pakistan",
      elevation: "8,611 m (2nd Highest Peak on Earth)",
      image: "images/k2_pakistan.jpg",
      description: "The crown monarch of the Karakoram range, renowned worldwide as the ultimate test of human endurance with its sheer pyramid of ice and rock.",
      keywords: ["pakistan", "pakistani", "k2", "karakoram", "baltoro", "gilgit", "mountain", "peak", "snow", "glacier"]
    },
    {
      id: 2,
      country: "Norway",
      flag: "🇳🇴",
      title: "Celestial Aurora & Arctic Fjords",
      location: "Tromsø & Lofoten Islands, Norway",
      elevation: "Arctic Circle Polar Night Skies",
      image: "images/aurora_borealis.jpg",
      description: "Cascading ribbons of emerald green and violet solar plasma dancing across polar skies over mirror-like Arctic fjords.",
      keywords: ["norway", "norwegian", "aurora", "northern lights", "tromso", "lofoten", "fjord", "arctic", "skies", "green"]
    },
    {
      id: 3,
      country: "Türkiye",
      flag: "🇹🇷",
      title: "Fairy Chimneys of Cappadocia",
      location: "Göreme Valley, Central Anatolia, Türkiye",
      elevation: "1,050 m Volcanic Tuff Formations",
      image: "https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?auto=format&fit=crop&w=1200&q=80",
      description: "Surreal wind-sculpted volcanic tuff spires and ancient valley dwellings rising into sunrise skies filled with vibrant hot air balloons.",
      keywords: ["turkey", "turkiye", "turkish", "cappadocia", "goreme", "balloons", "fairy chimneys", "anatolia", "valleys"]
    },
    {
      id: 4,
      country: "Switzerland",
      flag: "🇨🇭",
      title: "Matterhorn & The Alpine Pyramids",
      location: "Zermatt, Pennine Alps, Switzerland",
      elevation: "4,478 m Sharp Alpine Peak",
      image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80",
      description: "The iconic four-sided pyramidal peak standing sentinel over serene alpine lakes like Stellisee and evergreen Swiss valleys.",
      keywords: ["switzerland", "swiss", "matterhorn", "zermatt", "alps", "alpine", "mountain", "peak", "lake", "stellisee"]
    },
    {
      id: 5,
      country: "Pakistan",
      flag: "🇵🇰",
      title: "Passu Cathedral Cones & Hunza",
      location: "Hunza Valley, Karakoram Highway, Pakistan",
      elevation: "6,106 m Sharp Granite Spires",
      image: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80",
      description: "Dramatic needle-sharp serrated granite towers piercing the clouds above ancient apricot groves and the turquoise Hunza River.",
      keywords: ["pakistan", "pakistani", "hunza", "passu", "passu cones", "cathedral", "karakoram highway", "gilgit", "baltistan", "valley"]
    },
    {
      id: 6,
      country: "Japan",
      flag: "🇯🇵",
      title: "Mount Fuji at Dawn",
      location: "Honshu Island, Shizuoka/Yamanashi, Japan",
      elevation: "3,776 m Sacred Stratovolcano",
      image: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?auto=format&fit=crop&w=1200&q=80",
      description: "The eternal snow-capped volcanic cone revered as a sacred cultural symbol, framed by morning clouds and serene lake reflections.",
      keywords: ["japan", "japanese", "fuji", "mount fuji", "mt fuji", "volcano", "honshu", "kawaguchiko", "dawn", "sunrise", "cherry blossom"]
    },
    {
      id: 7,
      country: "Iceland",
      flag: "🇮🇸",
      title: "Skógafoss & The Aurora Falls",
      location: "Skógar, South Coast, Iceland",
      elevation: "60 m Glacial Waterfall",
      image: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=1200&q=80",
      description: "Thundering glacial cascades plunging over volcanic cliffs beneath dancing northern lights and misty rainbows on the Icelandic coast.",
      keywords: ["iceland", "icelandic", "waterfall", "skogafoss", "skoga", "aurora", "glacier", "falls", "northern lights", "volcanic"]
    },
    {
      id: 8,
      country: "France",
      flag: "🇫🇷",
      title: "Mont Blanc & The French Alps",
      location: "Chamonix-Mont-Blanc, Haute-Savoie, France",
      elevation: "4,809 m (Highest Peak in Western Europe)",
      image: "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&w=1200&q=80",
      description: "The glistening dome of Western Europe's highest mountain surrounded by colossal hanging glaciers and jagged granite needles of Chamonix.",
      keywords: ["france", "french", "mont blanc", "alps", "chamonix", "haute savoie", "mountain", "peak", "glacier", "snow"]
    },
    {
      id: 9,
      country: "Germany",
      flag: "🇩🇪",
      title: "The Mystic Black Forest",
      location: "Schwarzwald, Baden-Württemberg, Germany",
      elevation: "1,493 m Feldberg Mountain",
      image: "https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=1200&q=80",
      description: "Enchanting dense evergreen canopies, moss-covered ravines, and morning mist that inspired centuries of European folklore and fairy tales.",
      keywords: ["germany", "german", "black forest", "schwarzwald", "forest", "trees", "mist", "nature", "woods", "fairy tale"]
    },
    {
      id: 10,
      country: "India",
      flag: "🇮🇳",
      title: "The Great Himalayan Range & Pangong Tso",
      location: "Ladakh & Himalayas, India",
      elevation: "4,225 m Trans-Himalayan Heights",
      image: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1200&q=80",
      description: "High-altitude sapphire-blue glacial lake Pangong Tso surrounded by majestic snow-dusted Himalayan ridges and sweeping mountain passes.",
      keywords: ["india", "indian", "himalayas", "himalaya", "himalayan", "pangong", "pangong tso", "ladakh", "lake", "mountain", "peaks"]
    },
    {
      id: 11,
      country: "South Korea",
      flag: "🇰🇷",
      title: "Jeju Island: Seongsan Sunrise Peak",
      location: "Seongsan Ilchulbong, Jeju Island, South Korea",
      elevation: "182 m Volcanic Tuff Cone & Coastal Cliffs",
      image: "https://images.unsplash.com/photo-1548115184-bc6544d06a58?auto=format&fit=crop&w=1200&q=80",
      description: "The dramatic crown-shaped volcanic crater rising majestically from the emerald blue ocean waters of Jeju Island.",
      keywords: ["south korea", "korea", "korean", "jeju", "jeju island", "seongsan", "seongsan ilchulbong", "sunrise peak", "volcano", "island", "ocean"]
    },
    {
      id: 12,
      country: "Pakistan",
      flag: "🇵🇰",
      title: "Fairy Meadows & Nanga Parbat",
      location: "Diamer District, Gilgit-Baltistan, Pakistan",
      elevation: "8,126 m (Rupal Face 4,500m)",
      image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80",
      description: "Lush alpine meadows of pine and wildflower sitting directly beneath the colossal 4,500m sheer vertical ice wall of Nanga Parbat.",
      keywords: ["pakistan", "pakistani", "fairy meadows", "nanga parbat", "killer mountain", "rupal", "diamer", "gilgit", "mountain", "alpine"]
    }
  ];

  // Story Chronicles Dataset
  const storiesData = {
    k2: {
      title: "The Savage Throne: Karakoram & The Realm of K2",
      subtitle: "🇵🇰 Pakistan • Karakoram Range • 8,611m",
      image: "images/k2_pakistan.jpg",
      meta: "Expedition Log #01 • Baltoro Glacier Route",
      quote: "“K2 is a mountain of stone and ice that commands silence and absolute humility.”",
      content: `
        <p>Rising in the remote wilderness of Gilgit-Baltistan, Pakistan, K2 (8,611 meters) is known across the world as the 'Savage Mountain'. Unlike Mount Everest, K2 offers no easy slopes or forgiving approaches. Every meter gained up the Abruzzi Spur or the Cesen Route requires extreme mountaineering skill, endurance, and deep respect for the elements.</p>
        <p>Approaching K2 involves an epic 90-kilometer trek across the Baltoro Glacier, passing legendary granite spires like Trango Towers and Cathedral Peak before reaching Concordia—the spectacular 'Throne Room of the Mountain Gods'.</p>
        <p>The pyramid of K2 stands distinct, catching the first golden rays of sunrise while casting a shadow that stretches over dozens of kilometers across the Karakoram. It is a symbol of nature's raw, unfiltered grandeur.</p>
      `
    },
    aurora: {
      title: "Celestial Dances: Aurora Borealis in Norway",
      subtitle: "🇳🇴 Norway • Tromsø & Lofoten • Arctic Circle",
      image: "images/aurora_borealis.jpg",
      meta: "Expedition Log #02 • Solar Maximum Chronicle",
      quote: "“To witness the Northern Lights is to see the magnetic heartbeat of our planet painted across the cosmos.”",
      content: `
        <p>Deep within the Arctic Circle during polar night, temperatures plummet below minus twenty degrees Celsius. Standing on the snow-covered shoreline of a Norwegian fjord, the world is wrapped in crystalline silence.</p>
        <p>Suddenly, a faint olive-green glow stirs on the horizon. Within minutes, the solar wind collides with Earth's magnetosphere, triggering an explosive coronal display. Ribbons of neon emerald, violet, and magenta twist and cascade across the entire zenith, reflecting off the still, mirror-like waters below.</p>
        <p>Capturing the aurora requires patience and warmth, but the reward is one of the most sublime visual wonders anywhere on Earth.</p>
      `
    },
    cappadocia: {
      title: "Balloons at Dawn: The Surreal Skies of Cappadocia",
      subtitle: "🇹🇷 Türkiye • Göreme & Anatolia",
      image: "https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?auto=format&fit=crop&w=1200&q=80",
      meta: "Expedition Log #03 • Ancient Volcanic Tuff",
      quote: "“Where geological time and human ingenuity created an ethereal landscape like nowhere else.”",
      content: `
        <p>Millions of years ago, volcanic eruptions blanketed central Anatolia in soft ash, which solidified into porous rock known as tuff. Over millennia, wind, rain, and snow eroded the stone into the iconic 'fairy chimneys' that define the landscape of Cappadocia.</p>
        <p>Ancient inhabitants carved underground cities, cave churches, and cliff dwellings into this malleable rock. Today, at the crack of dawn, hundreds of hot air balloons drift silently over the honeycomb valleys, illuminated by the golden rays of the rising sun.</p>
      `
    }
  };

  let activeCountryFilter = 'all';
  let searchQuery = '';
  let filteredItems = [...wondersData];
  let currentCarouselIndex = 0;
  let currentLightboxIndex = 0;

  // --- 2. Three.js Engine: Interactive 3D Globe & Cosmic Dust ---
  const canvas = document.getElementById('three-canvas');
  if (canvas && typeof THREE !== 'undefined') {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 28;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // A. Interactive 3D Wireframe Earth Globe
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);
    globeGroup.position.set(13, -2, -6);

    // Globe Sphere Core
    const globeGeo = new THREE.SphereGeometry(7.5, 36, 36);
    const globeMat = new THREE.MeshBasicMaterial({
      color: 0x034b7f,
      wireframe: true,
      transparent: true,
      opacity: 0.15
    });
    const globeMesh = new THREE.Mesh(globeGeo, globeMat);
    globeGroup.add(globeMesh);

    // Latitude & Longitude Rings
    const ringGeo = new THREE.RingGeometry(7.6, 7.8, 48);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x64b5f6,
      transparent: true,
      opacity: 0.2,
      side: THREE.DoubleSide
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2;
    globeGroup.add(ringMesh);

    // Floating Country Beacon Dots on Globe
    const beaconCoords = [
      { lat: 35.8, lon: 76.5 },  // Pakistan (K2)
      { lat: 69.6, lon: 18.9 },  // Norway (Tromsø)
      { lat: 38.6, lon: 34.8 },  // Turkey (Cappadocia)
      { lat: 46.0, lon: 7.7 },   // Switzerland (Matterhorn)
      { lat: 35.3, lon: 138.7 }, // Japan (Fuji)
      { lat: 64.1, lon: -21.9 }, // Iceland
      { lat: 45.8, lon: 6.8 },   // France (Mont Blanc)
      { lat: 48.0, lon: 8.2 },   // Germany (Black Forest)
      { lat: 34.1, lon: 77.5 },  // India (Ladakh)
      { lat: 33.5, lon: 126.5 }  // South Korea (Jeju)
    ];

    beaconCoords.forEach(coord => {
      const phi = (90 - coord.lat) * (Math.PI / 180);
      const theta = (coord.lon + 180) * (Math.PI / 180);
      const radius = 7.7;

      const x = -(radius * Math.sin(phi) * Math.cos(theta));
      const z = radius * Math.sin(phi) * Math.sin(theta);
      const y = radius * Math.cos(phi);

      const beaconGeo = new THREE.SphereGeometry(0.2, 8, 8);
      const beaconMat = new THREE.MeshBasicMaterial({
        color: 0x64b5f6,
        transparent: true,
        opacity: 0.85
      });
      const beaconMesh = new THREE.Mesh(beaconGeo, beaconMat);
      beaconMesh.position.set(x, y, z);
      globeGroup.add(beaconMesh);
    });

    // B. Cosmic Particle Constellation Field
    const particleCount = 850;
    const partGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 95;
      positions[i + 1] = (Math.random() - 0.5) * 95;
      positions[i + 2] = (Math.random() - 0.5) * 95;
    }

    partGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const partMat = new THREE.PointsMaterial({
      color: 0x64b5f6,
      size: 0.35,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(partGeo, partMat);
    scene.add(particles);

    // Mouse Tracking Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX - window.innerWidth / 2) * 0.0004;
      mouseY = (e.clientY - window.innerHeight / 2) * 0.0004;
    });

    // Animation Loop
    function animate() {
      requestAnimationFrame(animate);

      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      // Globe continuous rotation
      globeGroup.rotation.y += 0.003;
      globeGroup.rotation.x += 0.0008;

      particles.rotation.y += 0.0005;
      particles.rotation.x += 0.0002;

      camera.position.x += (targetX * 20 - camera.position.x) * 0.05;
      camera.position.y += (-targetY * 20 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  // --- 3. 3D Showcase Carousel Engine ---
  const carouselStage = document.getElementById('carousel-stage');
  const carouselPrevBtn = document.getElementById('carousel-prev');
  const carouselNextBtn = document.getElementById('carousel-next');

  function renderCarousel() {
    if (!carouselStage) return;
    carouselStage.innerHTML = '';

    const itemsToDisplay = filteredItems.slice(0, 7);
    if (itemsToDisplay.length === 0) return;

    itemsToDisplay.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'carousel-card liquid-glass';
      card.dataset.index = index;

      card.innerHTML = `
        <img src="${item.image}" alt="${item.title}" loading="lazy">
        <div class="carousel-card-overlay">
          <span class="carousel-card-country">${item.flag} ${item.country}</span>
          <h4 class="carousel-card-title">${item.title}</h4>
          <p class="carousel-card-desc">${item.elevation || item.location}</p>
        </div>
      `;

      card.addEventListener('click', () => {
        if (index === currentCarouselIndex) {
          const globalIdx = wondersData.findIndex(w => w.id === item.id);
          openLightbox(globalIdx);
        } else {
          currentCarouselIndex = index;
          updateCarouselPositions();
        }
      });

      carouselStage.appendChild(card);
    });

    updateCarouselPositions();
  }

  function updateCarouselPositions() {
    const cards = carouselStage.querySelectorAll('.carousel-card');
    const total = cards.length;
    if (total === 0) return;

    cards.forEach((card, index) => {
      let offset = index - currentCarouselIndex;

      // Wrap around for circular 3D carousel
      if (total > 2) {
        if (offset > Math.floor(total / 2)) offset -= total;
        if (offset < -Math.floor(total / 2)) offset += total;
      }

      const absOffset = Math.abs(offset);
      const sign = Math.sign(offset);

      const translateX = offset * 260;
      const translateZ = -absOffset * 190;
      const rotateY = -sign * Math.min(absOffset * 28, 48);
      const scale = Math.max(1 - absOffset * 0.16, 0.62);
      const opacity = absOffset > 2 ? 0 : Math.max(1 - absOffset * 0.32, 0.45);
      const zIndex = 12 - absOffset;

      card.style.transform = `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`;
      card.style.opacity = opacity;
      card.style.zIndex = zIndex;
      card.style.pointerEvents = opacity === 0 ? 'none' : 'auto';
    });
  }

  if (carouselPrevBtn) {
    carouselPrevBtn.addEventListener('click', () => {
      const cardsCount = Math.min(filteredItems.length, 7);
      if (cardsCount === 0) return;
      currentCarouselIndex = (currentCarouselIndex - 1 + cardsCount) % cardsCount;
      updateCarouselPositions();
    });
  }

  if (carouselNextBtn) {
    carouselNextBtn.addEventListener('click', () => {
      const cardsCount = Math.min(filteredItems.length, 7);
      if (cardsCount === 0) return;
      currentCarouselIndex = (currentCarouselIndex + 1) % cardsCount;
      updateCarouselPositions();
    });
  }

  // Touch gestures for carousel
  let startX = 0;
  if (carouselStage) {
    carouselStage.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    }, { passive: true });

    carouselStage.addEventListener('touchend', (e) => {
      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;
      if (Math.abs(diff) > 40) {
        const cardsCount = Math.min(filteredItems.length, 7);
        if (cardsCount > 0) {
          if (diff > 0) {
            currentCarouselIndex = (currentCarouselIndex + 1) % cardsCount;
          } else {
            currentCarouselIndex = (currentCarouselIndex - 1 + cardsCount) % cardsCount;
          }
          updateCarouselPositions();
        }
      }
    }, { passive: true });
  }

  // --- 4. Bulletproof Gallery Grid & Search/Filter Engine ---
  const galleryGrid = document.getElementById('gallery-grid');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const searchInput = document.getElementById('search-input');
  const searchClearBtn = document.getElementById('search-clear-btn');
  const resultsCount = document.getElementById('results-count');
  const noResultsEl = document.getElementById('no-results');
  const resetFilterBtn = document.getElementById('reset-filter-btn');

  function applyFilters() {
    const rawSearch = (searchInput ? searchInput.value : searchQuery).toLowerCase().trim();
    searchQuery = rawSearch;

    filteredItems = wondersData.filter(item => {
      // 1. Country Tab Filter Match
      const matchesCountryTab = (activeCountryFilter === 'all') || 
        (item.country.toLowerCase() === activeCountryFilter.toLowerCase());

      // 2. Search Query Match
      if (!rawSearch) {
        return matchesCountryTab;
      }

      // Check if user is searching for a specific country or keyword
      const inCountry = item.country.toLowerCase().includes(rawSearch);
      const inTitle = item.title.toLowerCase().includes(rawSearch);
      const inLocation = item.location.toLowerCase().includes(rawSearch);
      const inDesc = item.description.toLowerCase().includes(rawSearch);
      const inKeywords = item.keywords ? item.keywords.some(k => k.toLowerCase().includes(rawSearch)) : false;

      const matchesSearch = inCountry || inTitle || inLocation || inDesc || inKeywords;

      // If user typed a search query, prioritize search match across all or currently selected tab
      if (activeCountryFilter !== 'all') {
        return matchesCountryTab && matchesSearch;
      }
      return matchesSearch;
    });

    currentCarouselIndex = 0;
    renderCarousel();
    renderGalleryGrid();

    // Update Result Counter
    if (resultsCount) resultsCount.textContent = filteredItems.length;

    // Handle No Results State
    if (noResultsEl && galleryGrid) {
      if (filteredItems.length === 0) {
        noResultsEl.style.display = 'block';
        galleryGrid.style.display = 'none';
      } else {
        noResultsEl.style.display = 'none';
        galleryGrid.style.display = 'grid';
      }
    }
  }

  function renderGalleryGrid() {
    if (!galleryGrid) return;
    galleryGrid.innerHTML = '';

    filteredItems.forEach((item) => {
      const gridItem = document.createElement('div');
      gridItem.className = 'grid-item';
      gridItem.dataset.id = item.id;

      gridItem.innerHTML = `
        <div class="grid-item-inner">
          <img src="${item.image}" alt="${item.title}" loading="lazy">
          <div class="grid-item-overlay">
            <span class="grid-item-badge">${item.flag} ${item.country}</span>
            <h3 class="grid-item-title">${item.title}</h3>
            <p class="grid-item-location"><i class="fa-solid fa-location-dot"></i> ${item.location}</p>
            <p class="grid-item-desc">${item.description}</p>
          </div>
        </div>
      `;

      // 3D Tilt Micro-Interaction
      gridItem.addEventListener('mousemove', (e) => {
        const rect = gridItem.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        const rotateX = (-y / rect.height) * 14;
        const rotateY = (x / rect.width) * 14;

        gridItem.style.transform = `translateY(-8px) scale(1.02) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });

      gridItem.addEventListener('mouseleave', () => {
        gridItem.style.transform = 'translateY(0) scale(1) rotateX(0deg) rotateY(0deg)';
      });

      // Lightbox click
      gridItem.addEventListener('click', () => {
        const globalIdx = wondersData.findIndex(w => w.id === item.id);
        openLightbox(globalIdx);
      });

      galleryGrid.appendChild(gridItem);
    });

    // GSAP Stagger Entrance
    if (typeof gsap !== 'undefined' && filteredItems.length > 0) {
      gsap.fromTo('.grid-item', 
        { opacity: 0, y: 25 }, 
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: 'power2.out' }
      );
    }
  }

  // Country Filter Buttons
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      activeCountryFilter = btn.dataset.country;

      // If user clicks a country pill, clear search box to show all wonders from that country
      if (searchInput && searchInput.value) {
        searchInput.value = '';
        searchQuery = '';
        if (searchClearBtn) searchClearBtn.style.display = 'none';
      }

      applyFilters();
    });
  });

  // Search Input Handler (Live input, keyup, change)
  if (searchInput) {
    const handleSearchInput = () => {
      searchQuery = searchInput.value.trim();
      if (searchClearBtn) {
        searchClearBtn.style.display = searchQuery ? 'block' : 'none';
      }

      // If user typed something and a specific country pill was active, reset active pill to 'all' so search is global
      if (searchQuery && activeCountryFilter !== 'all') {
        activeCountryFilter = 'all';
        filterBtns.forEach(b => {
          if (b.dataset.country === 'all') b.classList.add('active');
          else b.classList.remove('active');
        });
      }

      applyFilters();
    };

    searchInput.addEventListener('input', handleSearchInput);
    searchInput.addEventListener('keyup', handleSearchInput);
    searchInput.addEventListener('change', handleSearchInput);
  }

  if (searchClearBtn) {
    searchClearBtn.addEventListener('click', () => {
      searchInput.value = '';
      searchQuery = '';
      searchClearBtn.style.display = 'none';
      applyFilters();
    });
  }

  if (resetFilterBtn) {
    resetFilterBtn.addEventListener('click', () => {
      activeCountryFilter = 'all';
      searchQuery = '';
      if (searchInput) searchInput.value = '';
      if (searchClearBtn) searchClearBtn.style.display = 'none';

      filterBtns.forEach(b => {
        if (b.dataset.country === 'all') b.classList.add('active');
        else b.classList.remove('active');
      });

      applyFilters();
    });
  }

  // --- 5. Fullscreen Lightbox Modal Engine ---
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxBadge = document.getElementById('lightbox-badge');
  const lightboxLocation = document.getElementById('lightbox-location');
  const lightboxDesc = document.getElementById('lightbox-desc');
  const lightboxCounter = document.getElementById('lightbox-counter');
  const lightboxCloseBtn = document.getElementById('lightbox-close');
  const lightboxPrevBtn = document.getElementById('lightbox-prev');
  const lightboxNextBtn = document.getElementById('lightbox-next');

  function openLightbox(index) {
    if (!lightboxModal || index < 0 || index >= wondersData.length) return;
    currentLightboxIndex = index;
    const item = wondersData[currentLightboxIndex];

    lightboxImg.src = item.image;
    lightboxImg.alt = item.title;
    if (lightboxBadge) lightboxBadge.textContent = `${item.flag} ${item.country}`;
    if (lightboxTitle) lightboxTitle.textContent = item.title;
    if (lightboxLocation) lightboxLocation.innerHTML = `<i class="fa-solid fa-location-dot"></i> ${item.location} (${item.elevation || 'Natural Wonder'})`;
    if (lightboxDesc) lightboxDesc.textContent = item.description;
    if (lightboxCounter) lightboxCounter.textContent = `${currentLightboxIndex + 1} of ${wondersData.length}`;

    lightboxModal.classList.add('active');
    lightboxModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightboxModal) return;
    lightboxModal.classList.remove('active');
    lightboxModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function nextLightbox() {
    currentLightboxIndex = (currentLightboxIndex + 1) % wondersData.length;
    openLightbox(currentLightboxIndex);
  }

  function prevLightbox() {
    currentLightboxIndex = (currentLightboxIndex - 1 + wondersData.length) % wondersData.length;
    openLightbox(currentLightboxIndex);
  }

  if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightbox);
  if (lightboxNextBtn) lightboxNextBtn.addEventListener('click', nextLightbox);
  if (lightboxPrevBtn) lightboxPrevBtn.addEventListener('click', prevLightbox);

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });
  }

  // --- 6. Story Chronicle Reading Modal ---
  const storyModal = document.getElementById('story-modal');
  const storyModalBody = document.getElementById('story-modal-body');
  const storyModalClose = document.getElementById('story-modal-close');
  const journalCards = document.querySelectorAll('.journal-card');

  function openStoryModal(storyKey) {
    const story = storiesData[storyKey];
    if (!story || !storyModal || !storyModalBody) return;

    storyModalBody.innerHTML = `
      <div class="story-header">
        <img src="${story.image}" alt="${story.title}" class="story-hero-img">
        <div class="story-header-meta">
          <span>${story.subtitle}</span>
          <span>${story.meta}</span>
        </div>
        <h2>${story.title}</h2>
      </div>
      <div class="story-text">
        <blockquote class="story-quote">${story.quote}</blockquote>
        ${story.content}
      </div>
    `;

    storyModal.classList.add('active');
    storyModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeStoryModal() {
    if (!storyModal) return;
    storyModal.classList.remove('active');
    storyModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  journalCards.forEach(card => {
    card.addEventListener('click', () => {
      const storyKey = card.dataset.story;
      openStoryModal(storyKey);
    });
  });

  if (storyModalClose) storyModalClose.addEventListener('click', closeStoryModal);
  if (storyModal) {
    storyModal.addEventListener('click', (e) => {
      if (e.target === storyModal) closeStoryModal();
    });
  }

  // --- 7. Plan an Expedition Contact Form ---
  const contactForm = document.getElementById('contact-form');
  const formAlert = document.getElementById('form-alert');
  const submitBtn = document.getElementById('form-submit-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('form-name').value;
      const email = document.getElementById('form-email').value;
      const destination = document.getElementById('form-destination').value;
      const message = document.getElementById('form-message').value;

      if (!name || !email || !message) return;

      if (submitBtn && typeof gsap !== 'undefined') {
        gsap.to(submitBtn, { scale: 0.95, duration: 0.15, yoyo: true, repeat: 1 });
      }

      if (formAlert) {
        formAlert.innerHTML = `
          <i class="fa-solid fa-circle-check"></i>
          <span>Thank you <strong>${name}</strong>! Your expedition dispatch for <em>${destination}</em> has been received. Our team will contact you at <strong>${email}</strong> within 24 hours.</span>
        `;
        formAlert.classList.add('show');

        if (typeof gsap !== 'undefined') {
          gsap.fromTo(formAlert, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 });
        }
      }

      contactForm.reset();

      setTimeout(() => {
        if (formAlert) formAlert.classList.remove('show');
      }, 8000);
    });
  }

  // --- 8. Keyboard Controls ---
  document.addEventListener('keydown', (e) => {
    if (lightboxModal && lightboxModal.classList.contains('active')) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextLightbox();
      if (e.key === 'ArrowLeft') prevLightbox();
    }
    if (storyModal && storyModal.classList.contains('active')) {
      if (e.key === 'Escape') closeStoryModal();
    }
  });

  // --- 9. Mobile Nav & Smooth Active Scroll ---
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
    });

    mobileNav.querySelectorAll('.nav-link, .cta-btn').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
      });
    });
  }

  window.addEventListener('scroll', () => {
    const sections = ['hero', 'showcase-section', 'gallery-section', 'expeditions-section', 'reach-us-section'];
    const scrollPos = window.scrollY + 200;

    sections.forEach(secId => {
      const section = document.getElementById(secId);
      if (section) {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${secId}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      }
    });
  });

  // --- Initial Render ---
  applyFilters();

});
