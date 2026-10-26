# Simulation Labs

This directory is used to host custom, self-contained interactive simulation projects built by your team.

## How to add a new lab:

1. Obtain the production build of your simulation (e.g., the contents of the `dist/` folder if built with Vite).
2. Create a new subfolder in this directory for the simulation (e.g., `states-of-matter`).
3. Paste the contents of the build (the `index.html`, `js`, `css`, and `assets` folders) into that subfolder.

## How to link it in the ERP:

When updating the data in your `SimulationLab.jsx` (or your backend database), set the `url` property to point directly to the folder you created.

Example: If your folder is named `states-of-matter`, the URL should be:
```
/Labs/states-of-matter/index.html
```

Because these files are in the `public` directory, the React server automatically serves them at the root path (`/`).
