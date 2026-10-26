# Interactive Biology Simulations Suite

A collection of interactive, client-side STEM biology simulations built with HTML5 Canvas, modern Vanilla CSS, and JavaScript.

---

## 🔬 Simulations Included

### 1. 🌿 [Osmosis & Cell Plasmolysis Lab (`/osmosis_simulation`)](osmosis_simulation/)
- **Onion Epidermal Plant Cell**: Rigid outer cellulose cell wall, dynamic protoplast and central vacuole, turgor pressure ($\Psi_p$ up to 0.8 MPa) in hypotonic solution, and corner detachment (**plasmolysis**) in hypertonic salt solution ($\ge 7.0\%$).
- **Red Blood Cell (Animal Cell)**: Normal biconcave disc in physiological 0.9% saline, spiky crenation in hypertonic, and osmotic burst (**hemolysis**) in hypotonic solutions ($\le 0.2\%$).
- **U-Tube Osmometer**: Semi-permeable membrane demonstrating hydrostatic column height rise ($\Delta h$) proportional to solute concentration gradient.
- **Aquaporin Molecular View**: Lipid bilayer channel proteins facilitating single-file water flux while blocking solute particles.
- **Biophysics Engine**: Real-time solute potential $\Psi_s = -iCRT$, pressure potential $\Psi_p$, 5 gamified laboratory quests, and zero-blowout layout.

### 2. 🌱 [Photosynthesis & Elodea Bubble Counter (`/photosynthesis_simulation`)](photosynthesis_simulation/)
- **Apparatus Bench**: Movable illuminating lamp on metric ruler bench, submerged fresh *Elodea densa* waterweed sprig, inverted glass funnel, graduated collection tube accumulating oxygen gas volume ($V_{O_2}$ in mL), and flashing optical infrared bubble photogate.
- **Limiting Factors (Blackman's Law)**: Inverse-square light intensity ($I \propto 1/d^2$), Engelmann's action spectrum (White, Blue 450nm, Red 660nm, Green 530nm paradox), $\text{NaHCO}_3$ saturation curve, and temperature enzyme kinetics (optimum vs denaturation).
- **Interactive Modes**: Laboratory apparatus bench, thylakoid photolysis & Calvin cycle molecular view, and real-time kinetic curves graph.
- **Strict Light Theme**: Clean, bright, professional laboratory aesthetic with digital stopwatch and 5 gamified quests.

### 3. 🔬 [Virtual Compound Microscope & Mitosis Simulator (`/microscope_simulation`)](microscope_simulation/)
- **Compound Light Microscope Optics**: Coarse and fine focus adjustment, objective turret revolving nosepiece ($4\times, 10\times, 40\times, 100\times\text{ oil immersion}$), iris diaphragm aperture, and condenser illumination.
- **Cytology & Mitosis Specimen Slides**: High-resolution *Allium cepa* (onion root tip meristem), *Coregonus* (whitefish blastula), and stage micrometer calibration slides ($10\,\mu\text{m}$ divisions).
- **Interactive Cell Phase Tagging**: Click-to-tag cells into Interphase, Prophase, Metaphase, Anaphase, and Telophase with automatic tally and Mitotic Index ($\text{MI} = \frac{\text{Mitotic Cells}}{\text{Total Cells}} \times 100\%$) calculation.

### 4. ❤️ [Human Cardiac Cycle & ECG Simulator (`/cardiac_simulation`)](cardiac_simulation/)
- **4-Chamber Heart Hemodynamics**: Right/left atria and ventricles, tricuspid, bicuspid (mitral), aortic, and pulmonary semilunar valves opening and snapping shut with blood volume and pressure gradients.
- **Cardiac Electrical Conduction**: Sinoatrial (SA) node pacemaker, atrioventricular (AV) node delay, Bundle of His, bundle branches, and Purkinje fiber action potential propagation.
- **Synchronized Lead II ECG & Wiggers Diagram**: Real-time P wave, QRS complex, T wave tracing synchronized with ventricular pressure, atrial pressure, aortic pressure, ventricular volume, and phonocardiogram (S1 "lub", S2 "dub").
- **Clinical Auscultation Bench**: Draggable stethoscope bell with realistic acoustic heart sound auscultation at Aortic, Pulmonic, Tricuspid, and Mitral valve chest listening posts.

---

## 💻 Tech Stack
- **Pure Web Standards**: HTML5, Canvas 2D API, CSS3, ES6+ JavaScript.
- **Zero External Dependencies**: Works out-of-the-box locally or embedded via iframe in the ERP.

---

## 🚀 Running Locally
You can run any simulation using any static web server:

```bash
# Osmosis & Cell Plasmolysis Lab
cd osmosis_simulation
python -m http.server 8093

# Photosynthesis & Elodea Bubble Counter Lab
cd photosynthesis_simulation
python -m http.server 8094

# Virtual Compound Microscope & Mitosis Lab
cd microscope_simulation
python -m http.server 8099

# Human Cardiac Cycle & ECG Lab
cd cardiac_simulation
python -m http.server 8095
```
Or simply open the `index.html` file in any modern web browser.
