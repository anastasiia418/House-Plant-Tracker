# 🌱 CodeDopamine Frontend Coding Guidelines

_Last updated: April 2025_

Welcome! This document outlines the coding practices we follow on the frontend to keep things clean, scalable, and easy to work with — especially for newer developers.

---

## 🧠 General Principles

- Prefer clarity over cleverness
- Write readable, self-explanatory code
- Group related logic and abstract where possible
- Ask questions — don’t guess!

---

## 📁 Folder & Component Structure

- Each React component lives in its own folder:
/components/PlantCard/PlantCard.jsx /components/PlantCard/index.js

- Use an `index.js` inside each component folder to re-export the component:

export { default } from './PlantCard';

Top-level components/index.js should re-export all components:

export { default as PlantCard } from './PlantCard';
export { default as AddPlantForm } from './AddPlantForm';

🧼 File Naming
Use PascalCase for component filenames: AddPlantForm.jsx

Use .jsx for files that contain JSX

Group related files in the same folder (e.g., styles, test files)

🧩 Imports
Combine default and named imports when importing from React:

import React, { useState, useEffect } from 'react';

Organize imports:

External libraries

Internal components/constants

Styles

🧠 React Best Practices
Event handlers should:

Be named with verbs: handleSave, handleClose

Perform side effects (e.g., save, reset), not return JSX

For showing messages after an action:

const [success, setSuccess] = useState(false);
{success && <h3>Plant added!</h3>}

Reset multiple fields with a resetForm() helper function

🧾 Controlled Forms
Inputs must be controlled using value and onChange:

<input value={plantName} onChange={(e) => setPlantName(e.target.value)} />

Consider managing the form with a single state object (formData) for larger forms


🔤 Constants & Defaults
Shared values should go in the /constants folder:

fields.js — form field names

defaults.js — default object values

messages.js — success/empty state messages

Example:

// constants/fields.js
export const FIELDS = {
  PLANT_NAME: 'plantName',
  PLANT_TYPE: 'plantType',
  ...
};

🔘 Buttons & Forms
Always use valid type attributes:

<button type="submit">Save</button>
<button type="button">Cancel</button>

Avoid putting conditionals directly in return():

const plantListSection = plantList.length > 0 ? ... : ...;
return <div>{plantListSection}</div>;

🔑 List Keys
Avoid using array index as a key in .map()

Prefer unique values (e.g., plantName, plant.id)

🧽 Clean Code Habits
Alphabetize state declarations and similar blocks where it improves readability

Remove unused imports, styles, or variables

Keep function names consistent (handleX, resetForm, etc.)

Write short, single-responsibility functions

✅ Pre-PR Checklist
Before opening a pull request:

 All inputs are controlled

 Event handlers are clean (no JSX returns)

 Unnecessary state removed

 Constants used where applicable

 List keys are unique

 Button type attributes are valid

 components/index.js is updated if new components were added

🙋‍♀️ When in Doubt
Ask in the PR comments

Leave a TODO: or comment in the code if you’re unsure

You’re doing great — this is how real development works!


