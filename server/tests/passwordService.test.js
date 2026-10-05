import { describe, it, expect } from 'vitest';
import {
  hashPassword,
  comparePassword,
  generateResetToken,
  hashResetToken,
  generate6DigitOTP,
} from '../services/passwordService';

describe('Password & Token Security Service (Unit)', () => {
  it('should hash password and verify comparison correctly', async () => {
    const rawPassword = 'SecretPassword123!';
    const hashed = await hashPassword(rawPassword);

    expect(hashed).toBeDefined();
    expect(hashed).not.toBe(rawPassword);

    const isMatch = await comparePassword(rawPassword, hashed);
    expect(isMatch).toBe(true);

    const isInvalidMatch = await comparePassword('WrongPassword', hashed);
    expect(isInvalidMatch).toBe(false);
  });

  it('should generate secure raw and hashed reset tokens', () => {
    const { rawToken, hashedToken } = generateResetToken();

    expect(rawToken).toBeDefined();
    expect(rawToken).toHaveLength(64); // 32 bytes hex = 64 chars
    expect(hashedToken).toBeDefined();
    expect(hashedToken).toHaveLength(64); // sha256 hex = 64 chars

    const reHashed = hashResetToken(rawToken);
    expect(reHashed).toBe(hashedToken);
  });

  it('should generate valid 6-digit OTP code', () => {
    const otp = generate6DigitOTP();

    expect(otp).toBeDefined();
    expect(otp).toMatch(/^\d{6}$/);
    const num = parseInt(otp, 10);
    expect(num).toBeGreaterThanOrEqual(100000);
    expect(num).toBeLessThanOrEqual(999999);
  });
});
