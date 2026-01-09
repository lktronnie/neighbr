# Web3Forms Setup Guide

## Quick Setup (5 minutes)

Your contact form is currently configured to use **Web3Forms** to forward submissions to **admin@neighbrhk.com**.

### Step 1: Get Your Access Key

1. Visit **https://web3forms.com**
2. Enter your email: **admin@neighbrhk.com**
3. Click "Create Access Key"
4. Check your inbox for a verification email
5. Click the verification link
6. Copy your **Access Key** (it looks like: `a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6`)

### Step 2: Add Access Key to Website

1. Open `pitch.html` in your text editor
2. Find this line (around line 2057):
   ```html
   <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE">
   ```
3. Replace `YOUR_ACCESS_KEY_HERE` with your actual access key:
   ```html
   <input type="hidden" name="access_key" value="a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6">
   ```
4. Save the file

### Step 3: Test the Form

1. Start your local server:
   ```bash
   cd /Users/ronnielee/neighbr
   python3 -m http.server 8000
   ```
2. Open http://localhost:8000/pitch.html
3. Scroll to the bottom contact form
4. Fill out all fields and click "Start Free Trial"
5. Check **admin@neighbrhk.com** inbox for the submission

---

## What You'll Receive

When someone submits the form, you'll get an email at **admin@neighbrhk.com** with:

- **First Name**: The user's first name
- **Last Name**: The user's last name
- **Email**: Their work email address
- **Subject**: The inquiry subject they entered
- **Message**: Their detailed message about their building(s)

---

## Free Tier Limits

Web3Forms free tier includes:
- ✅ **Unlimited submissions** per month
- ✅ No monthly limits
- ✅ No account required after initial setup
- ✅ Email notifications
- ✅ Spam protection

Much better than FormSubmit.co which required confirmation emails!

---

## Troubleshooting

### "Submission failed" error
- Make sure you've replaced `YOUR_ACCESS_KEY_HERE` with your actual key
- Verify the access key is active at web3forms.com
- Check that admin@neighbrhk.com is verified

### Not receiving emails
- Check spam/junk folder
- Verify admin@neighbrhk.com is the email you used to create the access key
- Log into web3forms.com to see submission logs

### Form fields not translating
- The form uses bilingual placeholders that change with the EN/中 toggle
- If text isn't changing, check browser console for JavaScript errors

---

## Form Fields

The contact form includes:
1. **First Name** (名字) - Required
2. **Last Name** (姓氏) - Required
3. **Email** (你的工作電郵) - Required, validated with regex
4. **Subject** (主旨) - Required
5. **Message** (告訴我們關於您的大廈) - Required, textarea with 5 rows

All fields have:
- Real-time validation
- Bilingual error messages (English/Cantonese)
- Loading state during submission
- Success confirmation message

---

## Need Help?

- Web3Forms Documentation: https://docs.web3forms.com
- Web3Forms Support: support@web3forms.com
- Alternative services if needed: Formspree, Getform, EmailJS
