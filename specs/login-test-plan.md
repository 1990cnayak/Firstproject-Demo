# CROMS Login Test Plan

## 1. Objective
Validate that users can authenticate to CROMS from the public home page using Azure B2C sign-in and land in an authenticated session with expected UI controls.

## 2. Scope
In scope:
- Login entry from https://www-test.niacroms.org/
- Redirect to Azure B2C sign-in page
- Username/password sign-in flow
- Post-login landing behavior and authenticated header controls
- Error handling for invalid credentials and required fields
- Basic security and session checks

Out of scope:
- User registration workflow
- Role-based deep functional testing after login
- NIH federated login internals
- Backend identity provider implementation details

## 3. Entry / Exit Criteria
Entry criteria:
- Test environment is reachable
- Test user account is active and not locked
- Browser and network are stable

Exit criteria:
- All P0/P1 login cases executed
- No open critical defects for authentication flow
- Smoke suite is green on at least one primary browser

## 4. Test Data Strategy
Primary credential source:
- External Excel file: test-data/login-credentials.xlsx
- Worksheet: LoginData
- Required columns: username, password

Data sets:
- Valid account (UATUSER4@niacromstest.onmicrosoft.com)
- Invalid password
- Invalid username
- Empty username/password combinations
- Trim/whitespace boundary data

Security note:
- Credentials in plain text should be treated as temporary test data only.
- Rotate password regularly and avoid committing credential files to source control.

## 5. Environment Matrix
Browsers:
- Chromium (primary)
- Firefox
- WebKit

Execution modes:
- Headless CI smoke
- Headed local debugging

## 6. Detailed Login Scenarios
### P0 Critical
1. Successful login with valid local account.
2. Login form loads after clicking Sign In from home page.
3. Required field validation for blank username/password.
4. Error message on invalid password.
5. Error message on unknown username.
6. Session is established and authenticated control User Settings is visible.

### P1 High
7. User can retry login after one failed attempt.
8. Password field masks input.
9. Forgot your password link opens recovery flow.
10. Sign up now link opens registration flow.
11. Login round trip returns to expected CROMS host.
12. User remains logged in after refresh (session persistence behavior).

### P2 Medium
13. Tab order and keyboard-only login interaction works.
14. Enter key submits sign-in form.
15. Login page content and labels are accessible to screen readers.
16. Error text is visible and understandable.
17. Login behavior under slow network is stable.
18. CSP/console errors do not break successful login.

## 7. Detailed Test Case Template (Example)
TC-LOGIN-001: Valid Login
- Precondition: Active user in Excel row 1
- Steps:
  1. Open CROMS home page.
  2. Click Sign In.
  3. Enter username/password from Excel.
  4. Click Sign in.
- Expected:
  - Redirect back to CROMS host.
  - Authenticated page loads.
  - User Settings control is visible.
- Priority: P0

## 8. Automation Plan (Playwright)
Automated in this workspace:
- Test file: tests/login-excel.spec.ts
- Data utility: tests/utils/excelCredentials.ts
- Data source: test-data/login-credentials.xlsx

Approach:
- Read credentials from Excel at runtime.
- Execute end-to-end sign-in flow.
- Assert authenticated UI state using User Settings button.

Suggested pipeline split:
- Smoke: TC-LOGIN-001 on Chromium
- Full regression: all supported browser projects

## 9. Exploratory Run Findings (Today)
Observed during manual exploration on 2026-06-23:
- Sign In button redirects to Azure B2C sign-in page.
- Local account sign-in with provided UATUSER4 credentials succeeds.
- On return, authenticated navigation appears with User Settings button.
- A CSP warning appeared in console for a javascript: URL in page links, but login still completed.

## 10. Risks and Mitigations
- Risk: Credential rotation breaks tests.
  - Mitigation: Maintain test account ownership and periodic update procedure.
- Risk: MFA/conditional access policy changes affect automated login.
  - Mitigation: Keep dedicated automation test account with stable policy.
- Risk: UI selector drift in Azure B2C page.
  - Mitigation: Prefer role/label selectors and add fallback locators.

## 11. Recommended Next Enhancements
1. Add negative-path automated tests using additional Excel rows.
2. Add account lockout/non-functional rate-limit checks (if allowed).
3. Add screenshots/traces for failure diagnostics.
4. Add secure secret-source alternative (environment variables or vault) for CI.
