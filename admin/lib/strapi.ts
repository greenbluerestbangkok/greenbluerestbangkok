import { isDevelopmentMode } from './mock-data';
import { config } from './config';

// Strapi configuration
const STRAPI_URL = config.strapi.url;
const STRAPI_API_TOKEN = config.strapi.apiToken;

// Validate required environment variables
if (!STRAPI_URL) {
  throw new Error('Missing required Strapi environment variable: STRAPI_URL');
}

// Custom error types for Strapi operations
export class StrapiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string,
    public originalError?: any
  ) {
    super(message);
    this.name = 'StrapiError';
  }
}

export class StrapiAuthenticationError extends StrapiError {
  constructor(message = 'Authentication failed') {
    super(message, 401, 'AUTHENTICATION_ERROR');
    this.name = 'StrapiAuthenticationError';
  }
}

export class StrapiNotFoundError extends StrapiError {
  constructor(resource: string) {
    super(`${resource} not found`, 404, 'NOT_FOUND');
    this.name = 'StrapiNotFoundError';
  }
}

export class StrapiValidationError extends StrapiError {
  constructor(message: string, details?: any) {
    super(`Validation error: ${message}`, 422, 'VALIDATION_ERROR', details);
    this.name = 'StrapiValidationError';
  }
}

// Type definitions
export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiEntity {
  id: number;
  attributes: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface StrapiUser {
  id: number;
  username: string;
  email: string;
  confirmed: boolean;
  blocked: boolean;
  role: {
    id: number;
    name: string;
    description: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface StrapiAuthResponse {
  jwt: string;
  user: StrapiUser;
}

export interface StrapiLoginCredentials {
  identifier: string; // username or email
  password: string;
}

export interface StrapiCreateRequest {
  data: Record<string, any>;
}

export interface StrapiUpdateRequest {
  data: Record<string, any>;
}

// Helper function to handle Strapi API errors
function handleStrapiError(error: any, operation: string, resource?: string): never {
  if (error.status === 401) {
    throw new StrapiAuthenticationError();
  }

  if (error.status === 404) {
    throw new StrapiNotFoundError(resource || 'resource');
  }

  if (error.status === 422) {
    const message = error.message || 'Validation failed';
    throw new StrapiValidationError(message, error.errors);
  }

  // Generic Strapi error
  throw new StrapiError(
    `Strapi API error during ${operation}: ${error.message || 'Unknown error'}`,
    error.status,
    error.code,
    error
  );
}

// Helper function to get headers with authentication
function getHeaders(token?: string): HeadersInit {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
}

// Helper function to make authenticated requests
async function strapiRequest<T>(
  endpoint: string,
  options: RequestInit = {},
  token?: string
): Promise<T> {
  const url = `${STRAPI_URL}${endpoint}`;
  const headers = getHeaders(token);

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...headers,
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new StrapiError(
        errorData.error?.message || `HTTP ${response.status}`,
        response.status,
        errorData.error?.code,
        errorData
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof StrapiError) {
      throw error;
    }
    handleStrapiError(error, 'request', endpoint);
  }
}

/**
 * Authenticate with Strapi
 * @param credentials - Login credentials
 * @returns JWT token and user information
 */
export async function authenticate(credentials: StrapiLoginCredentials): Promise<StrapiAuthResponse> {
  try {
    const response = await strapiRequest<StrapiAuthResponse>('/api/auth/local', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    return response;
  } catch (error: any) {
    if (error.status === 400) {
      throw new StrapiAuthenticationError('Invalid credentials');
    }
    throw error;
  }
}

/**
 * Get current user information
 * @param token - JWT token
 * @returns User information
 */
export async function getCurrentUser(token: string): Promise<StrapiUser> {
  try {
    const response = await strapiRequest<StrapiUser>('/api/users/me', {
      method: 'GET',
    }, token);

    return response;
  } catch (error: any) {
    if (error.status === 401) {
      throw new StrapiAuthenticationError('Invalid or expired token');
    }
    throw error;
  }
}

/**
 * List entities from Strapi
 * @param contentType - Content type (e.g., 'articles', 'products', 'trips')
 * @param params - Query parameters
 * @param token - JWT token (optional for public content)
 * @returns List of entities
 */
export async function listEntities<T>(
  contentType: string,
  params: Record<string, any> = {},
  token?: string
): Promise<StrapiResponse<StrapiEntity[]>> {
  const searchParams = new URLSearchParams();
  
  // Add pagination
  if (params.page) searchParams.append('pagination[page]', params.page.toString());
  if (params.pageSize) searchParams.append('pagination[pageSize]', params.pageSize.toString());
  
  // Add sorting
  if (params.sort) searchParams.append('sort', params.sort);
  if (params.order) searchParams.append('sort', `${params.sort || 'id'}:${params.order}`);
  
  // Add filters
  if (params.search) {
    searchParams.append('filters[title][$containsi]', params.search);
  }
  if (params.status) {
    searchParams.append('filters[status][$eq]', params.status);
  }
  if (params.category) {
    searchParams.append('filters[category][$eq]', params.category);
  }

  const queryString = searchParams.toString();
  const endpoint = `/api/${contentType}${queryString ? `?${queryString}` : ''}`;

  return strapiRequest<StrapiResponse<StrapiEntity[]>>(endpoint, {
    method: 'GET',
  }, token);
}

/**
 * Get single entity by ID
 * @param contentType - Content type
 * @param id - Entity ID
 * @param token - JWT token (optional for public content)
 * @returns Entity data
 */
export async function getEntity<T>(
  contentType: string,
  id: number,
  token?: string
): Promise<StrapiResponse<StrapiEntity>> {
  return strapiRequest<StrapiResponse<StrapiEntity>>(`/api/${contentType}/${id}`, {
    method: 'GET',
  }, token);
}

/**
 * Create new entity
 * @param contentType - Content type
 * @param data - Entity data
 * @param token - JWT token
 * @returns Created entity
 */
export async function createEntity<T>(
  contentType: string,
  data: Record<string, any>,
  token: string
): Promise<StrapiResponse<StrapiEntity>> {
  const requestData: StrapiCreateRequest = { data };

  return strapiRequest<StrapiResponse<StrapiEntity>>(`/api/${contentType}`, {
    method: 'POST',
    body: JSON.stringify(requestData),
  }, token);
}

/**
 * Update entity
 * @param contentType - Content type
 * @param id - Entity ID
 * @param data - Updated data
 * @param token - JWT token
 * @returns Updated entity
 */
export async function updateEntity<T>(
  contentType: string,
  id: number,
  data: Record<string, any>,
  token: string
): Promise<StrapiResponse<StrapiEntity>> {
  const requestData: StrapiUpdateRequest = { data };

  return strapiRequest<StrapiResponse<StrapiEntity>>(`/api/${contentType}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(requestData),
  }, token);
}

/**
 * Delete entity
 * @param contentType - Content type
 * @param id - Entity ID
 * @param token - JWT token
 * @returns Deletion result
 */
export async function deleteEntity(
  contentType: string,
  id: number,
  token: string
): Promise<StrapiResponse<StrapiEntity>> {
  return strapiRequest<StrapiResponse<StrapiEntity>>(`/api/${contentType}/${id}`, {
    method: 'DELETE',
  }, token);
}

/**
 * Upload file to Strapi
 * @param file - File to upload
 * @param token - JWT token
 * @returns Upload result
 */
export async function uploadFile(
  file: File,
  token: string
): Promise<{ id: number; url: string; name: string; size: number }> {
  const formData = new FormData();
  formData.append('files', file);

  try {
    const response = await fetch(`${STRAPI_URL}/api/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new StrapiError(
        errorData.error?.message || `HTTP ${response.status}`,
        response.status,
        errorData.error?.code,
        errorData
      );
    }

    const result = await response.json();
    return result[0]; // Strapi returns array of files
  } catch (error) {
    if (error instanceof StrapiError) {
      throw error;
    }
    handleStrapiError(error, 'upload file');
  }
}

/**
 * Check Strapi health
 * @returns Health status
 */
export async function checkHealth(): Promise<{ status: string; message: string }> {
  try {
    const response = await fetch(`${STRAPI_URL}/api/health`);
    if (!response.ok) {
      throw new StrapiError(`Health check failed: HTTP ${response.status}`, response.status);
    }
    return await response.json();
  } catch (error) {
    if (error instanceof StrapiError) {
      throw error;
    }
    throw new StrapiError('Failed to connect to Strapi', 500, 'CONNECTION_ERROR', error);
  }
}

// Export configuration
export { STRAPI_URL, STRAPI_API_TOKEN };
