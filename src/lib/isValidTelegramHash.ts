import sha256 from "crypto-js/sha256";
import HmacSHA256 from "crypto-js/hmac-sha256";
import encHex from "crypto-js/enc-hex";

export type TelegramUser = {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date: number;
  hash: string;
};

const isValidTelegramHash = (data?: TelegramUser, token?: string): boolean => {
  if (!data || !token) {
    return false;
  }

  // Create the secret key
  const secret = sha256(token);

  // Sort and concatenate the data, excluding the "hash"
  const array = Object.entries(data).reduce<string[]>((acc, [key, value]) => {
    if (key !== "hash") {
      acc.push(`${key}=${value}`);
    }
    return acc;
  }, []);

  // Generate the HMAC hash
  const check_hash = HmacSHA256(array.sort().join("\n"), secret).toString(
    encHex
  );

  // Compare the generated hash with the provided hash
  return check_hash === data.hash;
};

export default isValidTelegramHash;
