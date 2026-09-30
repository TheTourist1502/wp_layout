export type LoginErrors = Partial<Record<'username' | 'password', string>>;

export function validateLogin(username: string, password: string): LoginErrors {
  const errors: LoginErrors = {};
  if (!username.trim()) errors.username = 'Enter your username or email.';
  if (password.length < 3) errors.password = 'Password must be at least 4 characters.';
  // else if (!/\d/.test(password)) errors.password = 'Password needs at least one number.';
  // else if (!/[A-Z]/.test(password)) errors.password = 'Password needs one uppercase letter.';
  return errors;
}

// Only same-origin paths; blocks `//evil.com` and `https://…` open redirects.
export function safeRedirect(target: unknown, fallback: string): string {
  return typeof target === 'string' && /^\/(?!\/)/.test(target) ? target : fallback;
}
