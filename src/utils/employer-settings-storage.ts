
import { EmployerSettingsState } from "@/types/employer-settings";

export const defaultEmployerSettings: EmployerSettingsState = {
  company: {
    companyName: "TechCorp Solutions",
    companyDescription: "Leading technology solutions provider",
    website: "https://techcorp.com",
    industry: "Technology",
    companySize: "51-100",
    location: "San Francisco, CA"
  },
  recruitment: {
    autoScreening: true,
    requireCoverLetter: false,
    allowRemote: true,
    sendApplicationUpdates: true
  }
};

// Global settings state for real-time sync
export let globalEmployerSettingsState: EmployerSettingsState = { ...defaultEmployerSettings };

// Load from localStorage
export const loadEmployerSettingsFromStorage = () => {
  try {
    const stored = localStorage.getItem('visiondrill-employer-settings');
    if (stored) {
      const parsed = JSON.parse(stored);
      globalEmployerSettingsState = { ...globalEmployerSettingsState, ...parsed };
    }
  } catch (error) {
    console.warn('Failed to load employer settings from storage:', error);
  }
};

// Save to localStorage
export const saveEmployerSettingsToStorage = () => {
  try {
    localStorage.setItem('visiondrill-employer-settings', JSON.stringify(globalEmployerSettingsState));
  } catch (error) {
    console.warn('Failed to save employer settings to storage:', error);
  }
};

// Update global state
export const updateGlobalEmployerSettings = (newState: Partial<EmployerSettingsState>) => {
  globalEmployerSettingsState = { ...globalEmployerSettingsState, ...newState };
};

// Initialize storage
loadEmployerSettingsFromStorage();

// Listeners for real-time sync
export const employerSettingsListeners: Set<() => void> = new Set();

export const notifyEmployerSettingsListeners = () => {
  employerSettingsListeners.forEach(listener => listener());
  saveEmployerSettingsToStorage();
};
