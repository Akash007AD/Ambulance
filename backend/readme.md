Here's an example of a `README.md` file that explains how to test the APIs you've built for OTP login, user registration, ambulance services, and more.

---

# Ambulance Services API

This API provides a service for efficient ambulance management and user authentication using OTP. The system also includes features like ambulance driver registration, user location updates, and hospital management. This `README.md` file contains instructions for testing all the available APIs with example requests.

## Table of Contents

- [Setup](#setup)
- [Routes Overview](#routes-overview)
- [User Authentication (OTP Login)](#user-authentication-otp-login)
- [Ambulance Driver APIs](#ambulance-driver-apis)
- [Hospital APIs](#hospital-apis)
- [Location Management](#location-management)
- [Logout](#logout)

## Setup

### Prerequisites

- Node.js (version 14+)
- MongoDB
- Twilio (for OTP service or alternative providers like MessageBird, Nexmo, etc.)

### Steps

1. Clone the repository:

```bash
git clone https://github.com/your-repo/ambulance-services-api.git
cd ambulance-services-api
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and add your environment variables:

```bash
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-key
SESSION_SECRET=your-session-secret
TWILIO_ACCOUNT_SID=your-twilio-account-sid
TWILIO_AUTH_TOKEN=your-twilio-auth-token
TWILIO_PHONE_NUMBER=your-twilio-phone-number
```

4. Start the server:

```bash
npm start
```

Server will run on port `5000` by default (or the one specified in the `.env` file).

## Routes Overview

- `/api/otp/send` - Send OTP to a user
- `/api/otp/verify` - Verify OTP
- `/api/users/register` - Register a new user
- `/api/ambulanceDrivers/register` - Register a new ambulance driver
- `/api/users/location` - Update user/driver location
- `/api/users/logout` - Logout the user

---

## User Authentication (OTP Login)

### 1. Send OTP to User

**Endpoint**: `POST /api/otp/send`

Send an OTP to a user's phone number.

#### Request Body:

```json
{
  "phoneNumber": "+1234567890"
}
```

#### Response:

```json
{
  "message": "OTP sent successfully"
}
```

### 2. Verify OTP

**Endpoint**: `POST /api/otp/verify`

Verify the OTP that the user received.

#### Request Body:

```json
{
  "phoneNumber": "+1234567890",
  "otp": "123456"
}
```

#### Response:

```json
{
  "message": "OTP verified successfully"
}
```

---

## Ambulance Driver APIs

### 1. Register Ambulance Driver

**Endpoint**: `POST /api/ambulanceDrivers/register`

Register a new ambulance driver by providing their information.

#### Request Body:

```json
{
  "name": "John Doe",
  "phoneNumber": "+1234567890",
  "password": "securepassword"
}
```

#### Response:

```json
{
  "message": "Driver registered successfully",
  "driver": {
    "_id": "605a72d5b5b5b2c8b05f8970",
    "name": "John Doe",
    "phoneNumber": "+1234567890"
  }
}
```

### 2. Login Ambulance Driver

**Endpoint**: `POST /api/ambulanceDrivers/login`

Login as an ambulance driver using phone number and password.

#### Request Body:

```json
{
  "phoneNumber": "+1234567890",
  "password": "securepassword"
}
```

#### Response:

```json
{
  "message": "Driver logged in successfully",
  "token": "your-jwt-token"
}
```

---

## Hospital APIs

### 1. Register Hospital (Future Enhancement)

This API is planned to register a hospital and manage real-time bed availability.

---

## Location Management

### 1. Update User/Driver Location

**Endpoint**: `POST /api/users/location`

Update the latitude and longitude of a user or driver.

#### Request Body:

```json
{
  "userId": "605a72d5b5b5b2c8b05f8970",
  "coordinates": {
    "latitude": 22.5726,
    "longitude": 88.3639
  }
}
```

#### Response:

```json
{
  "message": "Location updated successfully"
}
```

---

## Logout

### 1. Logout User/Driver

**Endpoint**: `POST /api/users/logout`

Logout the current session for the user or driver.

#### Request Body:

_N/A_

#### Response:

```json
{
  "message": "Logged out successfully"
}
```

---

## Conclusion

This API is built to handle user authentication, ambulance driver management, and location tracking services. The OTP-based login ensures a secure way for users and ambulance drivers to access services quickly. Make sure to configure the proper SMS service provider for production use.