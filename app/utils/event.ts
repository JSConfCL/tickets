export interface ParsedAddress {
  addressLine1?: string | null;
  addressLine2?: string | null;
  city?: string | null;
  country?: string | null;
  zip?: string | null;
}

export const idReference = (id: string) => id.split("-")[4];

export const parseAddress = (
  address: string | null | undefined,
): ParsedAddress | null => {
  if (!address) {
    return null;
  }

  return JSON.parse(address) as ParsedAddress;
};

export const formatAddress = (address: ParsedAddress | null): string | null => {
  if (!address) {
    return null;
  }

  const { addressLine1, addressLine2, city, country } = address;

  return [addressLine1, addressLine2, city, country]
    .filter((e) => Boolean(e))
    .join(", ");
};
