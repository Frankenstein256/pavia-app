import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const derived = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${salt}:${derived.toString("hex")}`;
}

export async function verifyPassword(
  password: string,
  hash: string,
): Promise<boolean> {
  const [salt, storedHash] = hash.split(":");
  const derived = (await scryptAsync(password, salt, 64)) as Buffer;
  const storedBuffer = Buffer.from(storedHash, "hex");
  return timingSafeEqual(derived, storedBuffer);
}
