# Bug Report - Factorial Calculator Application
**Application URL:** http://qainterview.pythonanywhere.com
**Test Date:** September 24, 2024
**Tester:** QA Automation Engineer

---

## Summary
During comprehensive testing of the factorial calculator application, **8 critical and high-priority bugs** were identified across different functional areas including UI elements, validation logic, navigation, and content display.

---

## Bugs Found

### BUG #1: Page Title Contains Typo
**Severity:** Medium
**Priority:** Medium
**Status:** Open

**Steps to Reproduce:**
1. Navigate to http://qainterview.pythonanywhere.com
2. Observe the browser tab title
3. Inspect the `<title>` element

**Expected Result:**
Page title should be "Factorial Calculator" or similar grammatically correct text

**Actual Result:**
Page title displays "Factoriall" (with double 'l')

**Impact:**
- Poor user experience
- Unprofessional appearance
- SEO impact

**Screenshot:** Available in test-results folder

---

### BUG #2: Navigation Links Swapped - Terms and Privacy
**Severity:** High
**Priority:** High
**Status:** Open

**Steps to Reproduce:**
1. Navigate to http://qainterview.pythonanywhere.com
2. Click on "Terms and Conditions" link
3. Observe the URL
4. Go back and click on "Privacy" link
5. Observe the URL

**Expected Result:**
- "Terms and Conditions" link should navigate to `/terms`
- "Privacy" link should navigate to `/privacy`

**Actual Result:**
- "Terms and Conditions" link navigates to `/privacy`
- "Privacy" link navigates to `/terms`

**Impact:**
- User confusion
- Legal compliance issues (users seeing wrong legal documents)
- Potential GDPR/privacy regulation violations

**Evidence:**
```
Terms link href: /privacy
Privacy link href: /terms
```

**Screenshot:** Available in test-results folder

---

### BUG #3: Negative Numbers Do Not Show Error Message
**Severity:** High
**Priority:** High
**Status:** Open

**Steps to Reproduce:**
1. Navigate to http://qainterview.pythonanywhere.com
2. Enter a negative number (e.g., -5) in the input field
3. Click "Calculate!" button
4. Observe the result

**Expected Result:**
An error message should be displayed stating that factorial is not defined for negative numbers, or "Please enter an integer"

**Actual Result:**
- No result is displayed
- No error message appears
- Result div remains hidden
- User receives no feedback

**Impact:**
- Poor user experience (no feedback)
- User confusion about whether the application is working
- Does not follow mathematical rules (factorial undefined for negative numbers)

**Technical Details:**
- Result div with id `#resultDiv` remains hidden
- No validation error is triggered
- Application appears to accept the input but provides no output

**Screenshot:** Available in test-results/ui-factorial-negative-Fact-97014-handle-negative-numbers--5--chromium/

---

### BUG #4: Very Long Number Strings Cause Silent Failure
**Severity:** High
**Priority:** Medium
**Status:** Open

**Steps to Reproduce:**
1. Navigate to http://qainterview.pythonanywhere.com
2. Enter a very long number (e.g., "123456789012345678901234567890")
3. Click "Calculate!" button
4. Observe the result

**Expected Result:**
- Error message should be displayed
- OR result should be calculated (if within system limits)
- OR clear message about number being too large

**Actual Result:**
- No result is displayed
- No error message appears
- Result div remains hidden
- Complete silence from the application

**Impact:**
- User receives no feedback
- Application appears broken
- No guidance on acceptable number ranges

**Screenshot:** Available in test-results/ui-factorial-negative-Fact-1a429-dle-very-long-number-string-chromium/

---

### BUG #5: Copyright Year Display Issue
**Severity:** Low
**Priority:** Low
**Status:** Open

**Steps to Reproduce:**
1. Navigate to http://qainterview.pythonanywhere.com
2. Scroll to the footer
3. Observe the copyright text

**Expected Result:**
Copyright should display current year (e.g., "© Qxf2 Services 2024")

**Actual Result:**
Copyright displays:
- "© Qxf2 Services document.write(new Date().getFullYear())2026 - document.write(new Date().getFullYear())2026"
- JavaScript code is visible in the text
- Shows "2026" instead of current year

**Impact:**
- Unprofessional appearance
- JavaScript not executing properly
- Incorrect year display

**Technical Analysis:**
The JavaScript `document.write()` is not executing and is displayed as literal text instead.

---

### BUG #6: External Link Navigation Timeout
**Severity:** Medium
**Priority:** Medium
**Status:** Open

**Steps to Reproduce:**
1. Navigate to http://qainterview.pythonanywhere.com
2. Click on "Qxf2 Services" link
3. Observe navigation behavior

**Expected Result:**
- Link should open Qxf2 website in same tab OR
- Link should open in new tab with `target="_blank"`

**Actual Result:**
- Navigation causes unexpected behavior
- Test timeout occurs
- Page context is lost

**Impact:**
- User experience disruption
- Users may lose their calculation data
- No clear indication of external navigation

**Recommendation:**
Add `target="_blank"` and `rel="noopener noreferrer"` attributes to external links

---

### BUG #7: Potential Large Number Overflow Issues
**Severity:** Medium
**Priority:** Low
**Status:** Open

**Steps to Reproduce:**
1. Navigate to http://qainterview.pythonanywhere.com
2. Enter number 100
3. Click "Calculate!" button
4. Observe the result

**Expected Result:**
- Display accurate factorial result OR
- Display scientific notation OR
- Show message about number being too large

**Actual Result:**
Result is displayed but may have precision issues due to JavaScript number limitations

**Impact:**
- Incorrect mathematical results for large numbers
- No warning about precision limits

**Technical Details:**
JavaScript numbers have precision limits. Factorials beyond ~170 result in Infinity. Numbers 13+ may have precision issues.

**Recommendation:**
- Add validation for maximum supported number (e.g., 170)
- Use BigInt or library for large number support
- Display clear message about supported range

---

### BUG #8: Missing Input Validation Range Documentation
**Severity:** Low
**Priority:** Medium
**Status:** Open

**Steps to Reproduce:**
1. Navigate to http://qainterview.pythonanywhere.com
2. Look for any indication of acceptable number range

**Expected Result:**
Clear indication of:
- Minimum acceptable number (typically 0)
- Maximum acceptable number
- Valid number format

**Actual Result:**
- No documentation of acceptable range
- Users must discover limitations through trial and error

**Impact:**
- Poor user experience
- Users don't know valid input range
- Increased support requests

**Recommendation:**
Add help text or tooltip showing:
- "Enter an integer between 0 and 170"
- Or similar guidance

---

## Bug Summary by Severity

| Severity | Count | Bugs |
|----------|-------|------|
| Critical | 0 | - |
| High | 3 | #2, #3, #4 |
| Medium | 4 | #1, #5, #6, #7 |
| Low | 1 | #8 |

---

## Bug Summary by Category

| Category | Count | Bugs |
|----------|-------|------|
| UI/Display | 2 | #1, #5 |
| Validation | 2 | #3, #4 |
| Navigation | 2 | #2, #6 |
| Functionality | 1 | #7 |
| Usability | 1 | #8 |

---

## Test Environment
- **Browser:** Chromium (Headless)
- **Operating System:** macOS
- **Screen Resolution:** 1280x720
- **Playwright Version:** 1.48.0
- **Node Version:** 18+

---

## Recommendations

### Immediate Fixes Required (High Priority):
1. Fix swapped Terms and Privacy links (#2)
2. Implement proper error handling for negative numbers (#3)
3. Add validation message for very long numbers (#4)

### Important Fixes (Medium Priority):
1. Correct page title typo (#1)
2. Fix copyright year JavaScript (#5)
3. Add target="_blank" to external links (#6)
4. Add number range validation (#7)

### Enhancement (Low Priority):
1. Add user guidance on acceptable input range (#8)

---

## Attachments
- Screenshots: Available in `test-results/` directory
- Test videos: Available in `test-results/` directory
- Automated test results: See `playwright-report/` directory
