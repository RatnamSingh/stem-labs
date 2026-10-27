# Interactive Physics Simulations Suite

A collection of interactive, client-side STEM physics simulations built with HTML5 Canvas, modern Vanilla CSS, and JavaScript.

---

## 🔬 Simulations Included

### 1. 🔍 [Lens Simulation (`/lens_simulation`)](lens_simulation/)
- **Convex & Concave Lenses**: Real-time ray tracing (Ray 1, Ray 2, Ray 3) and virtual ray back-extensions.
- **Interactive Objects**: Upright Arrow, Candle Flame, and **Student Character** (with ray emissions from the raised index fingertip).
- **Image Formation**: Real inverted images on projection screens vs. upright holographic virtual images.
- **HUD & Bench Controls**: Live focal length ($f$), object distance ($u$), image distance ($v$), and magnification ($m$).

### 2. 🌈 [Prism Simulation (`/prism_simulation`)](prism_simulation/)
- **Light Refraction & Snell's Law**: $n_1 \sin(\theta_1) = n_2 \sin(\theta_2)$ with incident angle and prism apex angle controls.
- **VIBGYOR Chromatic Dispersion**: Cauchy dispersion equation modeling wavelength-dependent refractive indices ($n(\lambda) = A + B/\lambda^2$).
- **Total Internal Reflection (TIR)**: Critical angle $\theta_c$ calculation and visualization.
- **Monochromatic & White Light Sources**: Real-time spectrum analysis.

### 3. 🚀 [Rocket Simulation (`/rocket_simulation`)](rocket_simulation/)
- **Newton's Laws of Motion**: $F_{\text{net}} = ma$, action-reaction pairs, weight ($W = mg$), and thrust.
- **Atmospheric Layers & Karman Line**: Troposphere through Outer Space cross-section.
- **2D Thrust Vectoring**: Real-time trajectory plotting and force resolution ($F_x, F_y$).
- **Telemetry Graphs & CSV Export**: Real-time altitude, velocity, and acceleration plotting.

### 4. 🎯 [Projectile Motion Simulation (`/projectile_simulation`)](projectile_simulation/)
- **2D Kinematics Engine**: Analytical trajectory equations & numerical quadratic air drag ($F_{\text{drag}} = \frac{1}{2} C_d \rho A v^2$).
- **Live Vector Overlays**: Real-time velocity decomposition ($\vec{v}, \vec{v}_x, \vec{v}_y$) and downward acceleration ($\vec{g}$).
- **Interactive Modes**: Firing Range (free exploration), Target Challenge (bullseye challenge), and Multi-Angle Plot.
- **Celestial Gravity**: Earth, Moon, Mars, Jupiter gravity environments with multiple projectiles.

### 5. ⚖️ [Hooke's Law & Spring-Mass Scale (`/spring_simulation`)](spring_simulation/)
- **Linear Elasticity & Spring Scale**: Hooke's law $F_s = -k \Delta x$ and mass weighing balance $m = \frac{k \Delta x}{g}$.
- **Simple Harmonic Motion (SHM)**: 60 FPS Runge-Kutta 4th Order (RK4) numerical integrator, critical damping controls.
- **Series & Parallel Linkages**: Dynamic effective stiffness ($k_{\text{eff}} = k_1 + k_2$ in parallel vs. $k_{\text{eff}} = \frac{k_1 k_2}{k_1 + k_2}$ in series).
- **Interactive Modes**: Single Spring, Series Springs, Parallel Springs, and Mystery Mass Weighing.

### 6. ⚡ [Wheatstone Bridge Simulation (`/wheatstone_bridge_simulation`)](wheatstone_bridge_simulation/)
- **Classical 4-Resistor Network**: Nodal analysis, Thévenin equivalent circuit, galvanometer null-deflection.
- **Meter Bridge Laboratory Bench**: 100 cm slide-wire apparatus, draggable jockey, and end error corrections.
- **Resistivity Determination**: Specific resistance ($\rho$) calculation from wire gauge and length.

### 7. 🌊 [Archimedes' Principle Simulation (`/Archimedes_simulation`)](Archimedes_simulation/)
- **Eureka Overflow Can**: Spring balance tension ($W_{\text{apparent}}$), overflow spout fluid displacement into a digital-scale graduated catch cylinder.
- **Hydrostatic Depth Pressure & FBD**: Pressure vectors $P(y) = P_0 + \rho g y$ acting on all surfaces, proving $F_B = \Delta P \cdot A$, plus Free Body Diagram vectors.
- **Flotation, Boat Cargo & Crown Mystery**: Damped harmonic bobbing, Plimsoll line cargo capacity, and King Hiero's golden crown density test.
- **Telemetry & Lab Notebook**: Real-time Apparent Weight Loss vs Displaced Fluid Weight logger with CSV export.

### 8. 🕰️ [Simple Pendulum & Galileo's Isochronism (`/pendulum_simulation`)](pendulum_simulation/)
- **Galileo's Isochronism (1581)**: Dual pendulum comparison proving period is independent of amplitude for small angles and independent of bob mass.
- **Nonlinear Kinematics Engine**: 60 FPS RK4 solver for $\ddot{\theta} + \frac{b}{mL^2}\dot{\theta} + \frac{g}{L}\sin\theta = 0$, Legendre elliptic series expansion for large angles ($T = T_0(1 + \frac{1}{16}\theta_0^2 + \dots)$), and dynamic string tension resolution.
- **Optical Photogate & Protractor**: Interactive angle protractor arc, laser diode photogate sensor at $\theta = 0$ measuring period automatically with sound feedback.
- **Phase Space & Waveforms**: Real-time oscilloscope waveform $\theta(t)$, closed-orbit Phase Space Portrait ($\theta$ vs. $\omega$), and Mechanical Energy Bar Chart ($E_k, E_p, E_{\text{total}}$).

### 9. 🔊 [Doppler Waves & Mach Cone Simulator (`/doppler_simulation`)](doppler_simulation/)
- **Spherical Acoustic Wavefronts**: 60 FPS expanding ring emissions demonstrating subsonic wavelength compression ($\lambda_{\text{front}} = \frac{v - v_s}{f_0}$) and rarefaction ($\lambda_{\text{rear}} = \frac{v + v_s}{f_0}$).
- **Supersonic Flight & Mach Shock Cone**: Sonic boom barrier constructive interference ($M = 1$) and supersonic conical Mach shockwave envelopes ($M > 1$) with half-angle $\mu = \arcsin(1/M)$.
- **Procedural Doppler Audio Engine**: Web Audio API continuous pitch synthesizer, emergency siren mode with stereo panning, and sonic boom pressure burst FX.
- **5 Exploration Modes**: Subsonic Motion, Mach Cone, Moving Observer, Passing Siren, and Static Source calibration.

### 10. 💎 [Diamond Light Refraction & Cut Simulator (`/diamond_simulation`)](diamond_simulation/)
- **Snell's Law & Cauchy Chromatic Dispersion**: Multi-wavelength ray tracing through faceted gem polygons with wavelength-dependent refractive indices $n(\lambda) = n_D + B(1/\lambda^2 - 1/\lambda_D^2)$.
- **Total Internal Reflection (TIR)**: Critical angle boundary calculation ($\theta_c \approx 24.4^\circ$ for diamond vs $41.1^\circ$ for glass) with internal bounce tracing and sparkle pings.
- **Marcel Tolkowsky 1919 Ideal Cut Proportions**: Brilliance return and fire dispersion metrics comparing Tolkowsky Ideal ($34.5^\circ$ crown, $40.75^\circ$ pavilion) against Shallow and Deep cuts.
- **Gemstone Library & Tunable Light**: Diamond, Moissanite, Cubic Zirconia, Sapphire, Zircon, and Crown Glass with White Light or Monochromatic Laser ($380\text{–}750\text{ nm}$).

### 11. 🎢 [CoasterLab — Roller Coaster Kinematics & Loop Fail Dynamics (`/roller_coaster_simulation`)](roller_coaster_simulation/)
- **Mechanical Energy Conservation**: Gravitational potential energy ($E_p = mgh$) converting to kinetic energy ($E_k = \frac{1}{2}mv^2$) along frictionless and air-drag affected coaster rails.
- **Loop Centripetal Acceleration & 2.5R Rule**: The minimum initial release height $h_{\text{min}} = 2.5R$ for circular loops required to maintain non-negative normal contact force ($F_N \ge 0$) at the loop crest without derailing or falling into parabolic projectile free-fall.
- **Clothoid vs Circular Geometry**: Transition from constant-curvature circular loops to Euler spiral clothoid (teardrop) profiles reducing peak g-forces ($g_{\text{entry}} \le 3.5g$ vs $6g+$ in circular loops).
- **Interactive Telemetry & Audio**: Live g-force accelerometer meter, velocity speedometer, mechanical energy bar charts, sound effects, and 5 student laboratory quests.

### 12. ⚛️ [Rutherford Alpha Particle Scattering Experiment (`/rutherford_simulation`)](rutherford_simulation/)
- **Ernest Rutherford (1911) Gold Foil Experiment**: Radioactive alpha emitter collimator, ultra-thin gold foil ($100\text{ nm}$), circular zinc sulfide fluorescent screen, and rotatable detector microscope.
- **Coulomb Electrostatic Repulsion**: Hyperbolic scattering trajectory computation governed by $F = \frac{1}{4\pi\varepsilon_0}\frac{(2e)(Ze)}{r^2}$.
- **Differential Cross-Section**: Impact parameter ($b$) correlation with scattering angle $\theta$, explaining why 1 in 8000 alpha particles rebound at angles $> 90^\circ$ to establish the atomic nucleus.

### 13. 📏 [Meter Bridge & Specific Resistance Simulator (`/meter_bridge_simulation`)](meter_bridge_simulation/)
- **Slide-Wire Wheatstone Bridge**: $100\text{ cm}$ manganin/constantan resistance wire with uniform cross-section and copper strip connections.
- **Null Point Determination**: Sliding contact jockey with sensitive galvanometer deflection detecting balance point ($l_1$) where $\frac{P}{Q} = \frac{R}{S}$.
- **Unknown Resistance & Resistivity**: Real-time calculation of unknown wire resistance $X = \frac{R(100 - l)}{l}$ and specific resistivity $\rho = \frac{\pi r^2 X}{L}$.

### 14. 🔋 [Potentiometer EMF Comparison & Internal Resistance Simulator (`/potentiometer_simulation`)](potentiometer_simulation/)
- **400 cm Multi-Wire Potentiometer**: 4 parallel $100\text{ cm}$ wire segments connected with low-resistance copper terminal blocks.
- **Primary Cell EMF Comparison**: Quantitative balance lengths for Leclanché and Daniell cells yielding $\frac{E_1}{E_2} = \frac{l_1}{l_2}$.
- **Internal Resistance Measurement**: Plug-key resistance box shunting the test cell to evaluate internal resistance $r = R\left(\frac{l_1 - l_2}{l_2}\right)$.

### 15. 🌈 [Single-Slit Fraunhofer Diffraction Simulator (`/diffraction_simulation`)](diffraction_simulation/)
- **Wave Optics Sinc-Squared Profile**: Analytical irradiance distribution $I(\theta) = I_0 \left(\frac{\sin \beta}{\beta}\right)^2$ with $\beta = \frac{\pi a \sin\theta}{\lambda}$.
- **Tunable Laser Diodes**: Switchable wavelengths: Red ($650\text{ nm}$), Yellow Sodium ($589\text{ nm}$), Green ($532\text{ nm}$), and Blue ($405\text{ nm}$).
- **Bench Metrology**: Interactive slit width ($a$) and screen distance ($D$) verifying central fringe width $W_0 = \frac{2\lambda D}{a}$ with movable photometer wand.

---

## 💻 Tech Stack
- **Pure Web Standards**: HTML5, Canvas 2D API, CSS3, ES6+ JavaScript.
- **Zero External Dependencies**: Works out-of-the-box locally or embedded via iframe in the ERP.

---

## 🚀 Running Locally
You can run any simulation using any static web server:

```bash
# Lens Simulation
cd lens_simulation
python -m http.server 8085

# Prism Simulation
cd prism_simulation
python -m http.server 8099

# Rocket Simulation
cd rocket_simulation
python -m http.server 8080

# Projectile Simulation
cd projectile_simulation
python -m http.server 8090

# Spring Simulation
cd spring_simulation
python -m http.server 8091

# Archimedes Simulation
cd Archimedes_simulation
python -m http.server 8088

# Pendulum Simulation
cd pendulum_simulation
python -m http.server 8092

# Doppler Simulation
cd doppler_simulation
python -m http.server 8096

# Diamond Simulation
cd diamond_simulation
python -m http.server 8097

# Wheatstone Bridge Simulation
cd wheatstone_bridge_simulation
python -m http.server 8082

# Roller Coaster Simulation
cd roller_coaster_simulation
python -m http.server 8084

# Rutherford Scattering Simulation
cd rutherford_simulation
python -m http.server 8086
```
Or simply open the `index.html` file in any modern web browser.
