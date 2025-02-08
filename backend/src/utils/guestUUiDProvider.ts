import crypto from "crypto";

const guestUUIDProvider = (size = 12) => {
  return "guest_" + crypto.randomBytes(size).toString("hex").substring(0, size);
}

export default guestUUIDProvider;

