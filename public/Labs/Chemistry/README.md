# Interactive Chemistry Simulations Suite

A collection of interactive, client-side STEM chemistry simulations built with HTML5, modern Vanilla CSS, and JavaScript.

---

## 🔬 Simulations Included

### 1. 🧊 [States of Matter (`/states-of-matter`)](states-of-matter/)
- Heat, cool, and compress atoms and molecules to observe phase changes across solid, liquid, and gas phases.

### 2. ⚛️ [Periodic Table & Hinglish Mnemonics Simulator (`/PT_Table_simulation`)](PT_Table_simulation/)
- **118 IUPAC Elements**: Complete properties including atomic numbers, mass, electronegativity, atomic radius, and electron configuration.
- **Hinglish Mnemonics Catalog**: Full collection of famous Indian coaching mnemonics (*"Beta Mange Car Scooter Baap Raazi"*, *"Helina Ki Rab Se Fariyad"*, etc.).
- **Interactive 2D Bohr Atom Visualizer**: Planetary orbital electron motion across concentric shells ($K, L, M, N, O, P, Q$).
- **Periodic Trends Heatmap**: Continuous color heatmap for electronegativity, atomic radius, ionization energy, melting point, and density.
- **Audio Synthesizer & Speech**: Web Audio procedural effects and Web Speech API mnemonic voice reader.
- **Memory Trainer Quiz**: Gamified trainer testing element-to-mnemonic mappings.

### 3. 🧪 [Acid-Base Indicator & Titration Lab (`/acid_base_simulation`)](acid_base_simulation/)
- **Spot Plate & Test Tubes Lab**: 4 glass test tubes on wooden rack, 6-well porcelain spot plate, 14 reagents, and detective mystery analytes.
- **Interactive Reagent Pipettes & Litmus Strips**: Dropper bottles with falling drops, Blue/Red litmus strips, universal pH test paper, and draggable benchtop digital pH meter probe.
- **Analytical Acid-Base Titration Lab**: 50 mL glass burette with working stopcock, Erlenmeyer flask on active magnetic stirrer with spinning bar and liquid vortex, and live real-time Titration Curve ($pH$ vs. $V_{\text{titrant}}$) graph.
- **Microscopic Molecular Equilibrium**: Real-time Brownian motion of $[HIn]$ and $[In^-]$ molecules demonstrating Henderson-Hasselbalch relation ($pH = pK_a + \log([In^-]/[HIn])$).
- **9 Supported Indicators**: Universal Indicator, Phenolphthalein, Bromothymol Blue, Methyl Orange, Litmus Solution, Red Cabbage (Anthocyanin), Turmeric (Curcumin), Phenol Red, Thymol Blue.

### 4. ⚖️ [Law of Conservation of Mass (`/conservation_of_mass_simulation`)](conservation_of_mass_simulation/)
- **NCERT Class 9 Chapter 3 Activity 3.1 & 3.2**: Verifying Antoine Lavoisier's (1789) foundational law.
- **Dual Scale & Sealed Apparatus**: Conical flask with rubber cork, suspended ignition tube, Barium Chloride ($\text{BaCl}_2$) and Sodium Sulfate ($\text{Na}_2\text{SO}_4$) solutions.
- **Mass Precision Balance**: Demonstrates $m_{\text{reactants}} = m_{\text{products}}$ before and after tilting to precipitate white $\text{BaSO}_4$.

### 5. 💡 [Tyndall Effect & Colloidal Solutions (`/tyndall_simulation`)](tyndall_simulation/)
- **NCERT Class 9 Chapter 2 Activity 2.1 & 2.2**: True solution (copper sulfate) vs. Colloid (milk/starch) vs. Suspension (chalk powder/mud).
- **Collimated Optical Laser Bench**: Light beam path visibility through colloidal dispersion due to particle scattering ($1\text{–}1000\text{ nm}$).
- **Filterability & Stability Analysis**: Whatman filter paper pass-through and gravitational settling over time.

### 6. 💧 [Solubility Curves & Crystallization (`/solubility_simulation`)](solubility_simulation/)
- **NCERT Class 9 Chapter 2 Activity 2.3 & 2.4**: Temperature-dependent solubility ($S$ vs $T$) for $\text{KNO}_3$, $\text{NaCl}$, $\text{CuSO}_4$, and $\text{NH}_4\text{Cl}$.
- **Solution Phases**: Unsaturated, saturated, and supersaturated states with precipitate mass calculation.
- **Fractional Crystallization**: Hot saturated solution cooling with geometric crystal nucleation and growth.

### 7. 🔥 [Thermal Decomposition of Ferrous Sulfate (`/ferrous_sulfate_simulation`)](ferrous_sulfate_simulation/)
- **NCERT Class 10 Chapter 1 Activity 1.5**: Thermal breakdown of green hydrated vitriol crystals ($\text{FeSO}_4 \cdot 7\text{H}_2\text{O}$).
- **Decomposition Stages**: Endothermic water of crystallization loss followed by red-brown Ferric Oxide ($\text{Fe}_2\text{O}_3$) residue.
- **Gas Evolution & Litmus Test**: Choking Sulfur Dioxide ($\text{SO}_2$) and Sulfur Trioxide ($\text{SO}_3$) gas liberation with moist blue litmus strip reddening.

### 8. ⚡ [Electrolysis of Water & Copper Electroplating (`/electrolysis_simulation`)](electrolysis_simulation/)
- **Hofmann Voltameter Bench**: $2:1$ stoichiometric volume ratio of Hydrogen gas ($H_2$ at cathode) and Oxygen gas ($O_2$ at anode).
- **Chemical Gas Confirmatory Tests**: Squeaky pop acoustic test for $H_2$ and rekindling glowing wooden splint test for $O_2$.
- **Faraday Copper Electroplating**: Electrolytic deposition kinetics of $\text{Cu}^{2+}$ ions onto cathode key/spoon apparatus.

### 9. 🔀 [Reactivity Series & Metal Displacement (`/reactivity_series_simulation`)](reactivity_series_simulation/)
- **Single Replacement Reactions**: Immersion of $\text{Fe}, \text{Zn}, \text{Cu}, \text{Mg}$ in sulfate solutions ($\text{CuSO}_4, \text{FeSO}_4, \text{ZnSO}_4, \text{AgNO}_3$).
- **Electrochemical Ladder & $E^\circ$**: Standard reduction potential hierarchy determining spontaneous displacement.
- **Exothermic Enthalpy & Crystal Growth**: Real-time thermometer temperature rise and dendritic silver arborization.

### 10. 🌈 [Flame Test & Atomic Emission Spectra (`/flame_test_simulation`)](flame_test_simulation/)
- **Bunsen Burner Flame Coloration**: Non-luminous flame testing for $\text{Li}^+$ (crimson), $\text{Na}^+$ (golden yellow), $\text{K}^+$ (lilac), $\text{Ca}^{2+}$ (brick red), $\text{Sr}^{2+}$ (scarlet), $\text{Ba}^{2+}$ (apple green), $\text{Cu}^{2+}$ (blue-green).
- **Quantum Photon Emission**: Electronic transition $\Delta E = hc/\lambda$ from excited states back to ground state.
- **Direct-Vision Spectroscope**: Calibrated discrete optical spectral emission lines overlay.

### 11. 🎈 [Kinetic Gas Laws & Ideal Gas Simulator (`/gas_laws_simulation`)](gas_laws_simulation/)
- **Classical Empirical Laws**: Boyle's Law ($P \propto 1/V$), Charles's Law ($V \propto T$), and Gay-Lussac's Law ($P \propto T$).
- **Microscopic Kinetic Theory (KMT)**: Elastic hard-sphere atomic collisions with container walls generating pressure.
- **Maxwell-Boltzmann Velocity Distribution**: Dynamic speed distribution histograms shifting with absolute temperature ($T$).

### 12. ⏳ [Reaction Kinetics & The Disappearing Cross (`/kinetics_simulation`)](kinetics_simulation/)
- **Sodium Thiosulfate + Acid Reaction**: $\text{Na}_2\text{S}_2\text{O}_3 + 2\text{HCl} \to 2\text{NaCl} + \text{SO}_2 + \text{S}\downarrow + \text{H}_2\text{O}$.
- **Colloidal Sulfur Turbidity**: Photometric light attenuation obscuring the black cross mark beneath the reaction flask.
- **Rate Order & Arrhenius Activation Energy**: Rate $= k[\text{Na}_2\text{S}_2\text{O}_3]^m[\text{HCl}]^n$ and linear Arrhenius plot $\ln(k)$ vs $1/T$ giving $E_a$.

### 13. 🌿 [Paper Chromatography & Plant Pigments Virtual Lab (`/chromatography_simulation`)](chromatography_simulation/)
- **Washburn Capillary Dynamics & Partition**: Dynamic solvent front migration ($h(t) \propto \sqrt{t}$) through Whatman No. 1 cellulose fibers in an airtight sealed chamber.
- **Chloroplast Pigment Separation**: Complete chromatographic resolution of Spinach extract into $\beta$-Carotene ($R_f \approx 0.94$), Xanthophyll ($R_f \approx 0.72$), Chlorophyll $a$ ($R_f \approx 0.58$), and Chlorophyll $b$ ($R_f \approx 0.42$).
- **Synthetic Black Ink Resolution**: Resolves black marker dye into Cyan ($R_f \approx 0.82$), Magenta ($R_f \approx 0.54$), and Tartrazine Yellow ($R_f \approx 0.28$).
- **Interactive Metric $R_f$ Ruler**: Draggable metric ruler measuring solute migration vs solvent front with real-time $R_f = d_{\text{solute}} / d_{\text{solvent}}$ calculation and procedural Web Audio droplet sound FX.

### 14. ⚗️ [Redox Titration & Permanganometry Virtual Lab (`/redox_titration_simulation`)](redox_titration_simulation/)
- **Self-Indicating Permanganometry**: Standard $0.02\text{ M } \text{KMnO}_4$ reducing to colorless $\text{Mn}^{2+}$ in acidic medium, with sharp permanent faint pink equivalence detection.
- **Primary Standards**: Titration of Mohr's Salt ($5\text{Fe}^{2+} + \text{MnO}_4^- + 8\text{H}^+ \to 5\text{Fe}^{3+} + \text{Mn}^{2+} + 4\text{H}_2\text{O}$) and Oxalic Acid with thermal water bath kinetics ($60\text{–}70^\circ\text{C}$).
- **Laboratory Bench Apparatus**: $50\text{ mL}$ glass burette with dark upper meniscus reading, working stopcock, and magnetic stirrer hotplate with spinning Teflon bar and liquid vortex.
- **Live Potentiometric Redox Curve**: Real-time Nernst cell potential ($E_{\text{cell}}$ vs. $V_{\text{titrant}}$) graph tracking sigmoidal inflection at equivalence ($V_{\text{eq}}$).

### 15. ⚡ [Galvanic Daniell Cell & Nernst Equation Virtual Lab (`/daniell_cell_simulation`)](daniell_cell_simulation/)
- **Electrochemical Couple & Nernst Law**: $\text{Zn}(s) | \text{Zn}^{2+}(aq) \parallel \text{Cu}^{2+}(aq) | \text{Cu}(s)$ with live Nernst equation $E_{\text{cell}} = E^\circ - \frac{0.0591}{2}\log_{10}([\text{Zn}^{2+}]/[\text{Cu}^{2+}])$ and Gibbs free energy $\Delta G$.
- **Draggable Salt Bridge**: U-tube filled with $\text{KCl}$ in agar-agar jelly; removing the bridge demonstrates immediate open-circuit drop to $0.000\text{ V}$.
- **Microscopic Electron Drift**: Animated electron transport along external copper wire to LED voltmeter, coupled with $\text{K}^+$ and $\text{Cl}^-$ ion migration through the salt bridge.
- **Faraday Mass Kinetics**: Live tracking of anodic zinc dissolution and cathodic copper deposition mass balance.

### 16. ⚖️ [Chemical Equilibrium & Le Chatelier's Principle Virtual Lab (`/le_chatelier_simulation`)](le_chatelier_simulation/)
- **Two Reversible Equilibrium Systems**:
  - Iron(III) Thiocyanate: $\text{Fe}^{3+} + \text{SCN}^- \rightleftharpoons [\text{Fe(SCN)}]^{2+}$ (blood red forward shift vs yellow reverse shift).
  - Cobalt(II) Hexaaqua / Tetrachloro: $[\text{Co(H}_2\text{O})_6]^{2+} + 4\text{Cl}^- \rightleftharpoons [\text{CoCl}_4]^{2-} + 6\text{H}_2\text{O}$ (endothermic blue forward shift vs pink reverse shift).
- **Perturbation Testing**: Interactive addition of $\text{FeCl}_3$, $\text{KSCN}$, Oxalic acid (complexation), $\text{AgNO}_3$ (precipitation), $\text{HCl}$, and hot ($80^\circ\text{C}$) / ice ($0^\circ\text{C}$) immersion baths.
- **4-Tube Laboratory Rack & Spectrophotometer**: Side-by-side comparison with reference standard tube, live laser absorption beam, and optical absorbance/transmittance readouts.

---

## 🚀 Running Locally
You can run any simulation using any static web server:

```bash
# Acid-Base Indicator Simulation
cd acid_base_simulation
python -m http.server 8089

# Periodic Table Simulation
cd PT_Table_simulation
python -m http.server 8095

# Conservation of Mass
cd conservation_of_mass_simulation
python -m http.server 8100

# Tyndall Effect
cd tyndall_simulation
python -m http.server 8101

# Solubility Curves
cd solubility_simulation
python -m http.server 8102

# Ferrous Sulfate Decomposition
cd ferrous_sulfate_simulation
python -m http.server 8103

# Electrolysis & Electroplating
cd electrolysis_simulation
python -m http.server 8104

# Reactivity Series
cd reactivity_series_simulation
python -m http.server 8105

# Flame Test Simulator
cd flame_test_simulation
python -m http.server 8106

# Gas Laws Simulator
cd gas_laws_simulation
python -m http.server 8107

# Chemical Kinetics
cd kinetics_simulation
python -m http.server 8108

# Paper Chromatography
cd chromatography_simulation
python -m http.server 8109

# Redox Titration
cd redox_titration_simulation
python -m http.server 8110

# Daniell Galvanic Cell
cd daniell_cell_simulation
python -m http.server 8111

# Le Chatelier Equilibrium
cd le_chatelier_simulation
python -m http.server 8112
```
Or simply open the `index.html` file in any modern web browser.
