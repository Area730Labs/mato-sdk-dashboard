import * as borsh from "@project-serum/borsh"

export type SdkErrorKind =
  | WalletAccountIsWrong
  | PriceError
  | AllItemsAreSold
  | NotEnoughFunds
  | ObjectIdTooLong
  | MarketEscrowError
  | ListingInfoHacked

  export type SdkErrorJSON =
  | WalletAccountIsWrongJSON
  | PriceErrorJSON
  | AllItemsAreSoldJSON
  | NotEnoughFundsJSON
  | ObjectIdTooLongJSON
  | MarketEscrowErrorJSON
  | ListingInfoHackedJSON

export interface WalletAccountIsWrongJSON {
  kind: "WalletAccountIsWrong"
}

export class WalletAccountIsWrong {
  readonly discriminator = 0
  readonly kind = "WalletAccountIsWrong"

  toJSON(): WalletAccountIsWrongJSON {
    return {
      kind: "WalletAccountIsWrong",
    }
  }

  toEncodable() {
    return {
      WalletAccountIsWrong: {},
    }
  }
}

export interface PriceErrorJSON {
  kind: "PriceError"
}

export class PriceError {
  readonly discriminator = 1
  readonly kind = "PriceError"

  toJSON(): PriceErrorJSON {
    return {
      kind: "PriceError",
    }
  }

  toEncodable() {
    return {
      PriceError: {},
    }
  }
}

export interface AllItemsAreSoldJSON {
  kind: "AllItemsAreSold"
}

export class AllItemsAreSold {
  readonly discriminator = 2
  readonly kind = "AllItemsAreSold"

  toJSON(): AllItemsAreSoldJSON {
    return {
      kind: "AllItemsAreSold",
    }
  }

  toEncodable() {
    return {
      AllItemsAreSold: {},
    }
  }
}

export interface NotEnoughFundsJSON {
  kind: "NotEnoughFunds"
}

export class NotEnoughFunds {
  readonly discriminator = 3
  readonly kind = "NotEnoughFunds"

  toJSON(): NotEnoughFundsJSON {
    return {
      kind: "NotEnoughFunds",
    }
  }

  toEncodable() {
    return {
      NotEnoughFunds: {},
    }
  }
}

export interface ObjectIdTooLongJSON {
  kind: "ObjectIdTooLong"
}

export class ObjectIdTooLong {
  readonly discriminator = 4
  readonly kind = "ObjectIdTooLong"

  toJSON(): ObjectIdTooLongJSON {
    return {
      kind: "ObjectIdTooLong",
    }
  }

  toEncodable() {
    return {
      ObjectIdTooLong: {},
    }
  }
}

export interface MarketEscrowErrorJSON {
  kind: "MarketEscrowError"
}

export class MarketEscrowError {
  readonly discriminator = 5
  readonly kind = "MarketEscrowError"

  toJSON(): MarketEscrowErrorJSON {
    return {
      kind: "MarketEscrowError",
    }
  }

  toEncodable() {
    return {
      MarketEscrowError: {},
    }
  }
}

export interface ListingInfoHackedJSON {
  kind: "ListingInfoHacked"
}

export class ListingInfoHacked {
  readonly discriminator = 6
  readonly kind = "ListingInfoHacked"

  toJSON(): ListingInfoHackedJSON {
    return {
      kind: "ListingInfoHacked",
    }
  }

  toEncodable() {
    return {
      ListingInfoHacked: {},
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj: any): SdkErrorKind {
  if (typeof obj !== "object") {
    throw new Error("Invalid enum object")
  }

  if ("WalletAccountIsWrong" in obj) {
    return new WalletAccountIsWrong()
  }
  if ("PriceError" in obj) {
    return new PriceError()
  }
  if ("AllItemsAreSold" in obj) {
    return new AllItemsAreSold()
  }
  if ("NotEnoughFunds" in obj) {
    return new NotEnoughFunds()
  }
  if ("ObjectIdTooLong" in obj) {
    return new ObjectIdTooLong()
  }
  if ("MarketEscrowError" in obj) {
    return new MarketEscrowError()
  }
  if ("ListingInfoHacked" in obj) {
    return new ListingInfoHacked()
  }

  throw new Error("Invalid enum object")
}

export function fromJSON(obj: SdkErrorJSON): SdkErrorKind {
  switch (obj.kind) {
    case "WalletAccountIsWrong": {
      return new WalletAccountIsWrong()
    }
    case "PriceError": {
      return new PriceError()
    }
    case "AllItemsAreSold": {
      return new AllItemsAreSold()
    }
    case "NotEnoughFunds": {
      return new NotEnoughFunds()
    }
    case "ObjectIdTooLong": {
      return new ObjectIdTooLong()
    }
    case "MarketEscrowError": {
      return new MarketEscrowError()
    }
    case "ListingInfoHacked": {
      return new ListingInfoHacked()
    }
  }
}

export function layout(property?: string) {
  const ret = borsh.rustEnum([
    borsh.struct([], "WalletAccountIsWrong"),
    borsh.struct([], "PriceError"),
    borsh.struct([], "AllItemsAreSold"),
    borsh.struct([], "NotEnoughFunds"),
    borsh.struct([], "ObjectIdTooLong"),
    borsh.struct([], "MarketEscrowError"),
    borsh.struct([], "ListingInfoHacked"),
  ])
  if (property !== undefined) {
    return ret.replicate(property)
  }
  return ret
}
