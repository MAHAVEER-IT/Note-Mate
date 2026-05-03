# 🔐 Authentication Setup & Troubleshooting Guide

## ✅ What Was Fixed

1. **Added `VITE_API_BASE_URL` to `.env`** - Was missing, causing API URL fallback issues
2. **Improved error handling in authService** - Better error messages and logging
3. **Added token-based authentication checks** - `getCurrentUser()` now validates tokens
4. **Created API client with interceptors** - Automatically attaches tokens to all requests
5. **Improved error messages in Login/Register** - Better feedback to users
6. **Added password validation** - Minimum 6 character requirement

---

## 🚀 Testing Your Authentication

### Step 1: Verify Environment Setup
```bash
# Check .env file has both variables
cat .env
# Should output:
# VITE_API_BASE_URL=https://note-mate-backend.onrender.com/api
# VITE_NVIDIA_API_KEY=nvapi-...
```

### Step 2: Test Registration
1. Go to `http://localhost:5174/register`
2. Enter:
   - Username: `testuser`
   - Email: `test@example.com`
   - Password: `password123`
3. Check browser console (F12) for errors
4. Should redirect to `/login` on success

### Step 3: Test Login
1. Go to `http://localhost:5174/login`
2. Enter registered email and password
3. Check browser console for errors
4. Should redirect to `/home` on success

### Step 4: Test Protected Route
1. Logout
2. Try to access `http://localhost:5174/home` directly
3. Should redirect to `/login`

---

## 🐛 Debugging Checklist

### 1. Check Network Requests (Browser DevTools)
```
F12 → Network tab
Look for POST requests to:
- https://note-mate-backend.onrender.com/api/auth/register
- https://note-mate-backend.onrender.com/api/auth/login
```

**Expected Response for Login:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "123",
    "email": "user@example.com",
    "username": "testuser"
  }
}
```

### 2. Check Console Errors
```
F12 → Console tab
Look for error messages like:
- "Network Error" → Backend not running
- "401 Unauthorized" → Invalid credentials
- "Cannot POST /register" → Endpoint mismatch
```

### 3. Check localStorage
```javascript
// In browser console:
localStorage.getItem('token')
// Should return a JWT token string

localStorage.getItem('user')
// Should return user object JSON
```

### 4. Backend API Verification
Test endpoints directly using curl or Postman:

```bash
# Test Registration
curl -X POST https://note-mate-backend.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }'

# Test Login
curl -X POST https://note-mate-backend.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

**Expected Success Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "...",
    "email": "test@example.com",
    "username": "testuser"
  }
}
```

**Expected Error Response (400/401):**
```json
{
  "message": "Invalid email or password",
  "status": 401
}
```

---

## ❌ Common Issues & Solutions

### Issue 1: "Cannot POST /register"
**Cause**: Backend endpoint doesn't exist or wrong URL
**Solution**: 
- Verify backend is running
- Check endpoint is `/api/auth/register` (not just `/register`)
- Check `VITE_API_BASE_URL` in `.env`

### Issue 2: "Network Error" (CORS)
**Cause**: Cross-Origin Resource Sharing not configured on backend
**Solution**: 
- Backend needs to set `Access-Control-Allow-Origin: *`
- Or configure for specific frontend URL

### Issue 3: Token not saved in localStorage
**Cause**: Response doesn't include `token` field
**Solution**: 
- Check backend sends `{ token: "...", user: {...} }`
- Verify response status is 200

### Issue 4: Page redirects to login after refresh
**Cause**: Token validation failing
**Solution**: 
- Check token format (should be JWT)
- Verify token is valid and not expired
- Check backend can validate token

### Issue 5: "All fields are required" error
**Cause**: Form fields are empty or validation failing
**Solution**: 
- Fill all fields (username, email, password)
- Password must be at least 6 characters
- Email must be valid format

---

## 📋 Complete Authentication Flow

### Registration Flow
```
1. User fills form (username, email, password)
2. Form validation (client-side)
3. POST /api/auth/register
4. Backend validates and creates user
5. Response includes token
6. Store token & user in localStorage
7. Redirect to /login
```

### Login Flow
```
1. User fills form (email, password)
2. Form validation (client-side)
3. POST /api/auth/login
4. Backend validates credentials
5. Response includes token
6. Store token & user in localStorage
7. AuthContext updates user state
8. Redirect to /home
```

### Protected Route Access
```
1. User visits /home
2. ProtectedRoute checks if token exists
3. If token exists → Allow access
4. If no token → Redirect to /login
```

---

## 🔑 API Endpoints Reference

### Auth Endpoints
| Method | Endpoint | Body | Response |
|--------|----------|------|----------|
| POST | `/api/auth/register` | `{username, email, password}` | `{token, user}` |
| POST | `/api/auth/login` | `{email, password}` | `{token, user}` |

### Notes Endpoints (Require Token)
| Method | Endpoint | Notes |
|--------|----------|-------|
| GET | `/api/notes` | Get all notes |
| POST | `/api/notes` | Create note |
| PUT | `/api/notes/:id` | Update note |
| DELETE | `/api/notes/:id` | Delete note |

### Sticky Notes Endpoints (Require Token)
| Method | Endpoint | Notes |
|--------|----------|-------|
| GET | `/api/sticky-notes` | Get all sticky notes |
| POST | `/api/sticky-notes` | Create sticky note |
| PUT | `/api/sticky-notes/:id` | Update sticky note |
| DELETE | `/api/sticky-notes/:id` | Delete sticky note |

### AI Schedule Endpoints (Require Token)
| Method | Endpoint | Notes |
|--------|----------|-------|
| GET | `/api/ai-schedules` | Get all schedules |
| POST | `/api/ai-schedules` | Create schedule |
| PUT | `/api/ai-schedules/:id` | Update schedule |

---

## 🛠️ Files Modified

1. **`.env`** - Added `VITE_API_BASE_URL`
2. **`src/services/authService.js`** - Improved error handling and token management
3. **`src/services/apiClient.js`** - NEW - Centralized API client with interceptors
4. **`src/pages/Login.jsx`** - Better error messages
5. **`src/pages/Register.jsx`** - Better error messages and validation
6. **`src/services/authService.js`** - Token-based authentication checks

---

## ✨ Next Steps

1. **Test the authentication flow** using the testing checklist above
2. **Check backend logs** for any error messages
3. **Verify CORS configuration** on backend if getting CORS errors
4. **Use apiClient** in other services (notes, sticky-notes, etc.) for automatic token attachment

Example usage in other services:
```javascript
import apiClient from './apiClient';

export const getNotes = async () => {
  const response = await apiClient.get('/notes');
  return response.data;
};
```

---

## 📞 Still Having Issues?

Check the following:
1. Backend is running and accessible
2. `.env` file has correct `VITE_API_BASE_URL`
3. Browser console shows network requests and responses
4. localStorage has token and user data
5. Backend logs show incoming requests
