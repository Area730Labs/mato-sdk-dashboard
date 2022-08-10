import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@project-serum/borsh"

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj: any): types.SdkErrorKind {
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

  throw new Error("Invalid enum object")
}

export function fromJSON(obj: types.SdkErrorJSON): types.SdkErrorKind {
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
  }
}

export function layout(property?: string) {
  const ret = borsh.rustEnum([
    borsh.struct([], "WalletAccountIsWrong"),
    borsh.struct([], "PriceError"),
    borsh.struct([], "AllItemsAreSold"),
    borsh.struct([], "NotEnoughFunds"),
    borsh.struct([], "ObjectIdTooLong"),
  ])
  if (property !== undefined) {
    return ret.replicate(property)
  }
  return ret
}
