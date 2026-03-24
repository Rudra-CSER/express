# 1. Authentication

## What is Authentication?

**Authentication = Who are you?**

It checks **user identity**.

Examples:

- Login with email & password
- Login with OTP
- Login with Google

### Real-life analogy

> Showing your **ID card** at the gate
> 

---

## Basic Authentication Flow

1. User signs up
2. Password is **hashed**
3. User logs in
4. Server verifies password
5. Server issues **JWT token**

---

# 2. Authorization

## What is Authorization?

**Authorization = What are you allowed to do?**

It checks **permissions / roles**.

Examples:

- Only admin can delete users
- Only logged-in user can update their profile

### Real-life analogy

> You entered the building (auth)
> 
> 
> But only managers can enter the server room (authorization)
> 

---

# 3. Validation

## What is Validation?

**Validation = Is the data correct?**

It checks **input correctness** before saving.

Examples:

- Email format valid?
- Password length >= 6?
- Required fields present?

---

## Types of Validation

1. **Frontend validation**
2. **Backend validation**
3. **Database validation (Mongoose)**

---

## Example: Validation using Mongoose

```jsx
email: {
type:String,
required:true,
unique:true,
match:/^[^\s@]+@[^\s@]+\.[^\s@]+$/
}

```

---

## Example: Validation using Express

```jsx
if (!email || !password) {
return res.status(400).json({message:"All fields required" });
}

```

---

## Example: Validation using express-validator

```bash
npm install express-validator

```

```jsx
const { body, validationResult } =require("express-validator");

app.post("/register",
body("email").isEmail(),
body("password").isLength({min:6 }),
(req, res) => {
const errors =validationResult(req);
if (!errors.isEmpty()) {
return res.status(400).json({errors: errors.array() });
    }
    res.send("Valid Data");
});

```

---

# 4. Verification

## What is Verification?

**Verification = Proving something is real or confirmed**

Usually happens **after authentication**

Examples:

- Email verification
- OTP verification
- Phone number verification

---

## Email Verification Flow

1. User registers
2. Server sends verification link
3. User clicks link
4. Account becomes verified

---

##

## 1. Hashing (Passwords)

### What is Hashing?

Hashing is a **one-way cryptographic process** that converts data (like a password) into a **fixed-length string**.

- Cannot be reversed
- Same input → same output
- Used to store passwords securely

### Why Hash Passwords?

If the database is hacked:

- Plain passwords→ fully exposed
- Hashed passwords → original password not readable

---

### Code Explanation (Line by Line)

```jsx
const hash = crypto.createHash("md5")
```

- Creates a **hashing object**
- `"md5"` is the hashing algorithm (Message Digest 5) **MD5 is NOT secure for real apps** (used here only for learning)

---

```jsx
.update(password)
```

- Takes the `password` string
- Feeds it into the hash function

Example:

```jsx
password ="123456"
```

---

```jsx
.digest("hex")
```

- Finalizes the hashing process
- Converts binary hash → readable **hexadecimal string**

---

### Final Result

```jsx
password ="123456"
hash ="e10adc3949ba59abbe56e057f20f883e"
```

This hash is what you store in the database

Never store the original password

---

---

## 2. Cookies

### What is a Cookie?

A cookie is **small data stored in the browser** and sent with every request.

### Why Cookies?

- Maintain **login sessions**
- Store **JWT token**
- Track user state

---

### Example (Backend – Express)

```jsx
res.cookie("token", jwtToken, {httpOnly:true,secure:true,sameSite:"strict"
})
```

### Important Cookie Flags

| Flag | Purpose |
| --- | --- |
| `httpOnly` | JS cannot access → XSS protection |
| `secure` | Only sent over HTTPS |
| `sameSite` | CSRF protection |

---

### Cookie Flow

1. User logs in
2. Server sends cookie
3. Browser stores cookie
4. Cookie auto-sent on every request

---

## 3. Token (JWT)

### What is a Token?

A token is a **string that proves identity**.

Most common: **JWT (JSON Web Token)**

---

### JWT Structure

```
HEADER.PAYLOAD.SIGNATURE
```

Example:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

### Why Use Tokens?

- Stateless authentication
- No server session storage
- Easy to scale

JWT Flow

1. Login → server creates JWT
2. JWT stored in cookie or localStorage
3. Client sends token with request
4. Server verifies token

---

### Token Verification Example

```jsx
jwt.verify(token, process.env.JWT_SECRET)
```

- Checks token validity
- Decodes user data
- Protects routes
Displaying JWT.md.

```
---
