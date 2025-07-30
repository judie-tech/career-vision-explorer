import { API_CONFIG } from '../config/api.config';

// API Client configuration for FastAPI backend
class ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
    this.token = localStorage.getItem('access_token');
  }

  setToken(token: string | null) {
    this.token = token;
    if (token) {
      localStorage.setItem('access_token', token);
    } else {
      localStorage.removeItem('access_token');
    }
  }

  getToken(): string | null {
    return this.token || localStorage.getItem('access_token');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    config?: { timeoutMs?: number; signal?: AbortSignal }
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const token = this.getToken();
    const timeoutMs = config?.timeoutMs || API_CONFIG.TIMEOUTS.DEFAULT;

    const defaultHeaders: HeadersInit = {};

    if (!(options.body instanceof FormData)) {
      defaultHeaders['Content-Type'] = 'application/json';
    }

    if (token) {
      defaultHeaders.Authorization = `Bearer ${token}`;
    }

    // Use provided signal or create new one for timeout
    let controller: AbortController | null = null;
    let timeoutId: NodeJS.Timeout | null = null;
    let signal = config?.signal;
    
    if (!signal) {
      controller = new AbortController();
      signal = controller.signal;
      timeoutId = setTimeout(() => controller!.abort(), timeoutMs);
    }

    const requestConfig: RequestInit = {
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
      signal,
      ...options,
    };

    try {
      console.log(`🚀 API Request: ${options.method || 'GET'} ${url}`);
      const startTime = performance.now();
      
      const response = await fetch(url, requestConfig);
      
      const endTime = performance.now();
      console.log(`✅ API Response: ${url} (${Math.round(endTime - startTime)}ms)`);
      
      if (timeoutId) clearTimeout(timeoutId);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || errorData.message || `HTTP ${response.status}`);
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      }
      
      return response.text() as unknown as T;
    } catch (error) {
      if (timeoutId) clearTimeout(timeoutId);
      
      if (error.name === 'AbortError') {
        if (config?.signal?.aborted) {
          // Request was cancelled by user
          console.log(`🚫 API Request cancelled: ${url}`);
          throw new Error('Request cancelled');
        } else {
          // Request timed out
          console.error(`⏰ API Timeout: ${url} (${timeoutMs}ms)`);
          throw new Error(`Request timed out after ${timeoutMs/1000} seconds. The database might be slow.`);
        }
      }
      
      console.error(`❌ API request failed: ${url}`, error);
      throw error;
    }
  }

  async get<T>(endpoint: string, config?: { timeout?: number; signal?: AbortSignal }): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' }, { timeoutMs: config?.timeout, signal: config?.signal });
  }

  // Fast timeout version for quick operations
  async getFast<T>(endpoint: string, config?: { signal?: AbortSignal }): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' }, { timeoutMs: API_CONFIG.TIMEOUTS.FAST, signal: config?.signal });
  }

  async post<T>(endpoint: string, data?: any, config?: { signal?: AbortSignal }): Promise<T> {
    const isFormData = data instanceof FormData;
    return this.request<T>(endpoint, {
      method: 'POST',
      body: isFormData ? data : (data ? JSON.stringify(data) : undefined),
    }, { signal: config?.signal });
  }

  async put<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }

  async patch<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // File upload helper
  async uploadFile<T>(endpoint: string, file: File, fieldName: string = 'file'): Promise<T> {
    const token = this.getToken();
    const formData = new FormData();
    formData.append(fieldName, file);

    const headers: HeadersInit = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      headers,
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || errorData.message || `HTTP ${response.status}`);
    }

    return await response.json();
  }
}

export const apiClient = new ApiClient();