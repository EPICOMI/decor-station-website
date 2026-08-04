/**
 * High-Performance Mouse-Reactive Background Canvas Component
 * Specialized for strict performance (0% idle CPU/GPU overhead)
 */

(function () {
  const canvas = document.getElementById('interactive-bg-canvas');
  const imgSource = document.getElementById('bg-logo-source');
  if (!canvas || !imgSource) return;

  const ctx = canvas.getContext('2d');

  // CONFIGURATION OBJECT
  const CONFIG = {
    gridSpacing: 120,          // Distance between logo centers in pixels
    baseScale: 0.1,            // Scale of the logo.svg matching header logo size
    maxProximityScale: 0.25,   // Maximum scale factor when mouse is closest
    reactionRadius: 200,       // Radius in pixels for cursor proximity calculation
    ease: 0.1,                 // Easing interpolation value (Lerp) for smooth motion
    pullForce: 0.2,            // Distance multiplier pulling the item toward cursor
    restThreshold: 0.005,       // Threshold beneath which a particle is considered at rest
  };

  // Particles array to keep track of state
  let particles = [];
  let animationId = null;
  let dpr = 1; // Device Pixel Ratio for High-DPI screen crispness

  // Active mouse state properties
  const mouse = {
    x: null,
    y: null,
    isActive: false
  };

  // Set baseScale dynamically based on header logo's actual rendered height/width if desired.
  // The header logo is: `height: 2rem; width: auto; aspect-ratio: 1 / 1;` which is 32px on 16px body font.
  // The logo.svg's natural dimensions are 1095x1095.
  // To match 32px height, baseScale = 32 / 1095 ≈ 0.0292.
  // We can automatically set CONFIG.baseScale based on image naturalWidth or fallback to 0.03.
  function updateBaseScale() {
    if (imgSource.naturalWidth) {
      // 32px is the header logo size (2rem = 32px)
      CONFIG.baseScale = 32 / imgSource.naturalWidth;
      // Also adjust max proximity scale in proportion to maintain similar visual ratios
      CONFIG.maxProximityScale = CONFIG.baseScale * 2.5;
    }
  }

  // Pre-calculate randomized, deterministic-like rotation angles for each grid particle
  // arranged in an out-of-phase staggered column pattern with doubled column density.
  function createGrid() {
    particles = [];

    // Get canvas logical (CSS) dimensions for correct calculations
    const logicalWidth = canvas.width / dpr;
    const logicalHeight = canvas.height / dpr;

    // Double the column density: horizontal spacing is half of base gridSpacing
    const spacingX = CONFIG.gridSpacing / 2;
    const spacingY = CONFIG.gridSpacing;

    // Determine grid columns and rows based on spacing
    const cols = Math.ceil(logicalWidth / spacingX) + 2;
    const rows = Math.ceil(logicalHeight / spacingY) + 2;

    // Center grid offsets (calculated in logical CSS pixels)
    const offsetX = (logicalWidth - (cols - 1) * spacingX) / 2;
    const offsetY = (logicalHeight - (rows - 1) * spacingY) / 2;

    // Generate grid from indices starting at -1 to ensure full boundary coverage on resizing/staggering
    for (let c = -1; c < cols + 1; c++) {
      for (let r = -1; r < rows + 1; r++) {
        const baseX = offsetX + c * spacingX;
        let baseY = offsetY + r * spacingY;

        // Create an out-of-phase layout:
        // Shift vertical positions of odd-numbered columns halfway down
        if (Math.abs(c) % 2 === 1) {
          baseY += spacingY / 2;
        }

        particles.push({
          baseX: baseX,
          baseY: baseY,
          x: baseX,
          y: baseY,
          scale: CONFIG.baseScale,
          // Random static rotation angle between 0 and 2*PI
          angle: Math.random() * Math.PI * 2,
        });
      }
    }
  }

  // LERP Helper
  function lerp(start, end, t) {
    return start + (end - start) * t;
  }

  // Resize handler
  function handleResize() {
    // Get catalog main container coordinates and dimensions
    const mainSection = canvas.parentElement;
    if (!mainSection) return;

    const rect = mainSection.getBoundingClientRect();
    dpr = window.devicePixelRatio || 1;

    // Scale canvas internal dimensions by DPR to ensure high resolution crispness
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    // Set CSS dimensions to match CSS layout
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';

    updateBaseScale();
    createGrid();

    // Trigger frame update
    wakeLoop();
  }

  // RENDER ENGINE
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Scale canvas drawings cleanly by DPR to look crisp on High-DPI screens
    ctx.save();
    ctx.scale(dpr, dpr);

    let elementsMoving = false;
    const imgWidth = imgSource.naturalWidth || 1095;
    const imgHeight = imgSource.naturalHeight || 1095;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      let targetX = p.baseX;
      let targetY = p.baseY;
      let targetScale = CONFIG.baseScale;

      // Interaction calculation with active mouse state
      if (mouse.isActive && mouse.x !== null && mouse.y !== null) {
        // Euclidean distance from mouse cursor to base position
        const dx = mouse.x - p.baseX;
        const dy = mouse.y - p.baseY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < CONFIG.reactionRadius) {
          // Normalize force based on proximity
          const force = (CONFIG.reactionRadius - distance) / CONFIG.reactionRadius; // 0 to 1

          // Target scale interpolation
          targetScale = CONFIG.baseScale + (CONFIG.maxProximityScale - CONFIG.baseScale) * force;

          // Pull vector towards the cursor (magnetic gravity center)
          targetX = p.baseX + dx * force * CONFIG.pullForce;
          targetY = p.baseY + dy * force * CONFIG.pullForce;
        }
      }

      // Smooth interpolation using LERP
      p.x = lerp(p.x, targetX, CONFIG.ease);
      p.y = lerp(p.y, targetY, CONFIG.ease);
      p.scale = lerp(p.scale, targetScale, CONFIG.ease);

      // Verify if elements are still transitioning or moving above restThreshold
      const distFromTarget = Math.sqrt((p.x - targetX) * (p.x - targetX) + (p.y - targetY) * (p.y - targetY));
      const scaleDiff = Math.abs(p.scale - targetScale);

      if (distFromTarget > CONFIG.restThreshold || scaleDiff > CONFIG.restThreshold) {
        elementsMoving = true;
      } else {
        // Snap directly to target to fully rest and avoid infinitesimal sub-pixel updates
        p.x = targetX;
        p.y = targetY;
        p.scale = targetScale;
      }

      // Render the SVG repeated onto the canvas context
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);

      // Draw image centered at the particle's animated coordinates
      const renderW = imgWidth * p.scale;
      const renderH = imgHeight * p.scale;
      ctx.drawImage(imgSource, -renderW / 2, -renderH / 2, renderW, renderH);

      ctx.restore();
    }

    // Restore high-DPI scaling context
    ctx.restore();

    // THE PERFORMANCE & SLEEP MECHANISM:
    // If element/grid items are active, request the next animation frame.
    // If everything is completely at rest, cancel the loop (animationId = null) to shut down CPU/GPU draw calls.
    if (elementsMoving) {
      animationId = requestAnimationFrame(draw);
    } else {
      animationId = null;
    }
  }

  // Sleep engine helper to wake up loop when event is detected
  function wakeLoop() {
    if (animationId === null) {
      animationId = requestAnimationFrame(draw);
    }
  }

  // Set up event listeners
  function setupEventListeners() {
    const parentContainer = canvas.parentElement;

    parentContainer.addEventListener('mousemove', function (e) {
      const rect = canvas.getBoundingClientRect();
      // Calculate coordinates relative to the canvas/main container
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.isActive = true;

      wakeLoop();
    });

    parentContainer.addEventListener('mouseenter', function () {
      mouse.isActive = true;
      wakeLoop();
    });

    // Gracefully clear active mouse properties on leave
    parentContainer.addEventListener('mouseleave', function () {
      mouse.isActive = false;
      wakeLoop();
    });

    window.addEventListener('mouseleave', function () {
      mouse.isActive = false;
      wakeLoop();
    });

    // Handle viewport resize dynamically
    window.addEventListener('resize', handleResize);
  }

  // Initialize once the image has finished loading
  if (imgSource.complete) {
    handleResize();
    setupEventListeners();
  } else {
    imgSource.addEventListener('load', function () {
      handleResize();
      setupEventListeners();
    });
  }

})();
