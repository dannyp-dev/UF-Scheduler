# UF Scheduler frontend

This is a fork of [andychen482/UF-Scheduler](https://github.com/andychen482/UF-Scheduler). It runs the course search, prerequisite view, and schedule planner in the browser. The companion course API is [UF-Scheduler-Backend](https://github.com/dannyp-dev/UF-Scheduler-Backend).

## Run locally

Run the companion Flask API on port 5000. Copy `.env.example` to `.env.local`, then run:

```bash
npm ci --legacy-peer-deps
npm start
```

The legacy peer dependency flag is needed because the original scheduler package specifies a MUI peer version older than the one in this repository. To check a production build, run `npm run build`.

Term choices come from `GET /api/terms` and only show data loaded by the API. Sections whose meeting times are missing are labeled unavailable and excluded from timetable combinations. A section is called fully online only when UF marks its `sectWeb` value as `AD`.

## Hosted features

The original app depended on separately hosted identity, live chat, AI, analytics, and Mapbox services. Without their configuration, the public planner starts in guest mode and shows a setup message in those views. The `.env.example` file lists the configuration fields needed for new accounts. Do not commit secrets or a UF session cookie. A production deployment also needs an approved current schedule export with meeting times, as explained in the backend README.
