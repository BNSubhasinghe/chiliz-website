# chiliz: Smart Chilli Crop Intelligence System

Project website for research project **R26-IT-075**, *Smart Chilli Crop Intelligence System Using an Autonomous Ground Rover*, from the Department of Information Technology, Faculty of Computing, Sri Lanka Institute of Information Technology (SLIIT), 2026 Regular Batch.

The site presents the research domain, milestones, documents, presentation slides, team and contact details. **chiliz** is the commercial product name of the research outcome.

**Live site:** https://chilliz.tech/

---

## About the research

Chilli cultivation in Sri Lanka is heavily affected by disease, water stress, soil imbalance and uneven field conditions. Most farmers still rely on manual observation, fixed irrigation schedules and delayed soil testing, so problems are often found only after the crop is damaged.

This project develops an autonomous ground rover that collects field data through cameras, GNSS/IMU and soil sensors. Machine learning models analyse crop health, soil status, irrigation needs and field zones. A farmer-friendly dashboard then turns the results into practical recommendations.

**Research question:** How can an autonomous ground rover-based intelligent system improve chilli crop monitoring and decision-making by integrating disease detection, soil health prediction, irrigation control and field zone mapping?

### Research components

| Component | Member | Key methods | Results |
|---|---|---|---|
| Intelligent Navigation and Sensor-Based Irrigation Control | Arachci B. N. S. (IT22112682) | GNSS reliability scoring, threshold-based drip irrigation, Isolation Forest, Random Forest | 3,346 sensor records, 35 engineered features |
| AI-Based Chilli Crop Disease, Stress and Growth Monitoring | Kulasekara D. K. M. (IT22108722) | EfficientNet-B0, Grad-CAM, TensorFlow Lite | 8-class chilli disease model with on-device export |
| Field Zone Mapping and Autonomous Seeding and Treatment Planning | S. G. M. B. Subasinghe (IT22276032) | Sentinel-2 indices (NDVI, NDWI, EVI, SAVI), K-Means | 120,130 records, silhouette score 0.5423 |
| Soil Health Prediction Using a Hybrid LSTM and XGBoost Model | S. N. R. Jayawardhana (IT22192950) | LSTM, XGBoost, NPK sensor data | 89.46% test accuracy (LSTM alone: 88.12%) |

---

## Website pages

| Page | File | Contents |
|---|---|---|
| Home | `index.html` | Project overview, key results, research components, system flow, field visits, prototype comparison, chiliz commercialization plan |
| Domain | `domain.html` | Literature survey, research gap, research problem, research question, objectives, methodology, technologies used |
| Milestones | `milestones.html` | Dropdown selector and timeline of all assessments with date, status and marks |
| Documents | `documents.html` | Project charter, proposal, research paper and group report (view online or download) |
| Presentations | `presentations.html` | Proposal, progress 1, progress 2 and final presentation slides (view online or download) |
| About Us | `about.html` | Research group members and supervisor panel |
| Contact Us | `contact.html` | Contact directory, institute details and an email template form |

### Features

- Pure HTML, CSS and JavaScript: no frameworks, build step or dependencies
- Responsive layout from mobile to desktop
- In-page PDF viewer with "open in new tab" and download options (mobile browsers open PDFs in a new tab)
- Site search (press `Ctrl + K`, `Cmd + K` or `/`)
- Milestone dropdown in the navigation and on the Milestones page
- Animated field-zone hero, counters and methodology steps, all of which respect the "reduce motion" accessibility setting
- Optimised WebP images with lazy loading, so the whole site without PDFs is about 1.5 MB

---

## Folder structure

```
.
├── index.html
├── domain.html
├── milestones.html
├── documents.html
├── presentations.html
├── about.html
├── contact.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── images/            Field photos, results charts and system flow diagram
├── people/            Photos of group members and supervisors
├── documents/         Project PDFs
└── presentations/     Presentation slides as PDFs
```

---

## Adding your files

The pages link to fixed file names. Upload files with **exactly** these names. GitHub Pages is case-sensitive, so `Samantha.jpg` and `samantha.jpg` are different files.

### `documents/`

| File name | Document |
|---|---|
| `project-charter.pdf` | Project Charter |
| `project-proposal.pdf` | Project Proposal |
| `research-paper.pdf` | Final Research Paper |
| `group-report.pdf` | Group Report |

### `presentations/`

Export each PowerPoint deck as PDF (**File > Save As > PDF**) so it can be viewed in the browser.

| File name | Presentation |
|---|---|
| `proposal-presentation.pdf` | Proposal Presentation |
| `progress-presentation-1.pdf` | Progress Presentation 1 |
| `progress-presentation-2.pdf` | Progress Presentation 2 |
| `final-presentation.pdf` | Final Presentation |

### `people/`

| File name | Person |
|---|---|
| `bhagya.jpg` | Arachci B. N. S. |
| `kasuni.jpg` | Kulasekara D. K. M. |
| `mayomi.jpg` | S. G. M. B. Subasinghe |
| `salani.jpg` | S. N. R. Jayawardhana |
| `Samantha.jpg` | Prof. Samantha Rajapaksha |
| `chathurya.jpg` | Ms. Chathurya Kumarapperuma |

Portrait photos about 480 px wide keep the site fast.

> **Size limit:** the SLIIT course web allows a maximum of 20 MB. Compress large PDFs before uploading.

---

## Running locally

Open `index.html` in a browser, or serve the folder so the PDF viewer behaves as it will online:

```bash
# Python 3
python -m http.server 8000

# or Node.js
npx serve .
```

Then visit `http://localhost:8000`.

---

## Deploying to GitHub Pages

1. Create a new repository on GitHub and push these files to the `main` branch:

   ```bash
   git init
   git add .
   git commit -m "Add R26-IT-075 research website"
   git branch -M main
   git remote add origin https://github.com/<your-github-username>/<repository-name>.git
   git push -u origin main
   ```

2. In the repository, go to **Settings > Pages**.
3. Under **Build and deployment**, set **Source** to *Deploy from a branch*, choose `main` and `/ (root)`, then select **Save**.
4. After a minute or two the site is live at `https://<your-github-username>.github.io/<repository-name>/`. Update the live site link at the top of this README.

> GitHub warns when a single file is over 50 MB and blocks files over 100 MB. Keep each PDF well below this.

---

## Updating content

All content is plain HTML, so edit the page files directly.

- **Milestone marks and status:** in `milestones.html`, each milestone has a hidden `<template>` with its details. Replace `TBA` with the allocated marks, and change `Upcoming` to `Completed` (and the `next` class to `done`) as assessments are finished.
- **Upcoming documents:** when the final check list, thesis or publication evidence is ready, replace its dashed "pending" card in `documents.html` with a regular card that links to the new PDF.
- **Colours and fonts:** design tokens are at the top of `css/style.css` under `:root`.
- **Search index:** the list of searchable pages and sections is the `IDX` array in `js/main.js`.

---

## Technologies

**Website:** HTML5, CSS3, vanilla JavaScript, Google Fonts (Bricolage Grotesque, Instrument Sans)

**Research system:** Python, TensorFlow / Keras, TensorFlow Lite, scikit-learn, XGBoost, Pandas, NumPy, Matplotlib / Seaborn, Sentinel-2 imagery, GNSS / IMU sensors, soil moisture and NPK sensors, Leaflet and OpenStreetMap

---

## Research team

| Name | Student ID | Email |
|---|---|---|
| Arachci B. N. S. | IT22112682 | it22112682@my.sliit.lk |
| Kulasekara D. K. M. | IT22108722 | it22108722@my.sliit.lk |
| S. G. M. B. Subasinghe | IT22276032 | it22276032@my.sliit.lk |
| S. N. R. Jayawardhana | IT22192950 | it22192950@my.sliit.lk |

### Supervisor panel

| Role | Name | Email |
|---|---|---|
| Supervisor | Prof. Samantha Rajapaksha | samantha.r@sliit.lk |
| Co-supervisor | Ms. Chathurya Prabhavi Kumarapperuma | chathurya.k@sliit.lk |

---

## Acknowledgements

Field testing was carried out with guidance from the **Hector Kobbekaduwa Agrarian Research and Training Institute (HARTI)** at chilli plantations in Malagala, Padukka and in the Hanwella to Avissawella area.

---

## License

&copy; 2026 Research Group R26-IT-075, Sri Lanka Institute of Information Technology. All rights reserved.

This website and its research content are part of an academic research project. Please contact the research team before reusing any material.
