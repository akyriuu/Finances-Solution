# Personal Finances

A simple personal finance tracker built with HTML, CSS, and TypeScript.

<img width="576" height="480" alt="ezgif-413d60bc337c6cc1" src="https://github.com/user-attachments/assets/e1393e3d-0399-4cc2-aedf-d76937bc08fc" />


## Features - CRUD.

- Add, edit, and delete transactions (income or expense)
- Categorize transactions (Salary, Freelance, Food, Housing, etc.)
- Filter transactions by type or search by description/category
- Running totals for revenue, expenses, and balance
- Values formatted in Brazilian Real (R$)

## How to Build

You need [Node.js](https://nodejs.org/) and TypeScript installed.

```bash
npm install -g typescript
tsc --project ts.config.json
```

The compiled JavaScript will be output to `src/dist/`.

## How to Run

Just open `index.html` in your browser. No server needed.

## Project Structure

```
index.html          # Main page
ts.config.json      # TypeScript config
src/
  script.ts         # App logic (source)
  dist/             # Compiled output (generated, not tracked)
styles/
  style.css         # Styles
```
