# Grand Comodores Backend API

Production-ready Express API for Grand Comodores hotel booking.

## Tech Stack

- Node.js + Express (MVC-style folder structure)
- PostgreSQL (`pg`)
- JWT auth
- Paystack payment integration
- Gmail SMTP notifications (via Nodemailer)

## Quick Start

1. Install dependencies:

```bash
npm install
```

2. Create your environment file:

```bash
cp .env.example .env
```

3. Update `.env` values (database, JWT, Paystack, SMTP).

4. Run migrations:

```bash
npm run migrate
```

5. Seed test accounts:

```bash
npm run seed:test-accounts
```

6. Start server:

```bash
npm run dev
```

## Test Accounts (seed script)

`npm run seed:test-accounts` creates or updates:

- `admin.test@grandcomodores.com` / `AdminTest123!` (admin)
- `staff.test@grandcomodores.com` / `StaffTest123!` (staff)
- `guest.test@grandcomodores.com` / `GuestTest123!` (customer)

## Notes

- Booking overlap prevention is enforced at service/repository level.
- Paystack transaction verification updates payment + booking status.
- Booking confirmation and admin notification emails are sent after successful verification.
