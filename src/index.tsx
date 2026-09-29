import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ReactGA from 'react-ga4';
import 'react-tooltip/dist/react-tooltip.css'
import { AuthContext, AuthContextProps, AuthProvider } from 'react-oidc-context';
import { AUTH_ENABLED, cognitoConfig } from './config/api';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const analyticsEnabled = Boolean(process.env.REACT_APP_GA_TOKEN);
if (analyticsEnabled) ReactGA.initialize(process.env.REACT_APP_GA_TOKEN as string);
const guestAuth = { isAuthenticated: false, isLoading: false, user: null } as AuthContextProps;
root.render(
  <React.StrictMode>
    {AUTH_ENABLED ? <AuthProvider {...cognitoConfig}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider> : <AuthContext.Provider value={guestAuth}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthContext.Provider>}
  </React.StrictMode>
);

type WebVitalMetric = {
  id: string;
  name: string;
  value: number;
};

const sendToGoogleAnalytics = (metric: WebVitalMetric) => {
  const { id, name, value } = metric;

  if (analyticsEnabled) ReactGA.send({
    hitType: 'event',
    eventCategory: 'Web Vitals',
    eventAction: name,
    eventLabel: id,
    eventValue: Math.round(name === 'CLS' ? value * 1000 : value),
  });
};

reportWebVitals(sendToGoogleAnalytics);
