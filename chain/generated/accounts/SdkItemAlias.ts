import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@project-serum/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface SdkItemAliasFields {
  mint: PublicKey
}

export interface SdkItemAliasJSON {
  mint: string
}

export class SdkItemAlias {
  readonly mint: PublicKey

  static readonly discriminator = Buffer.from([
    173, 59, 116, 90, 191, 7, 213, 200,
  ])

  static readonly layout = borsh.struct([borsh.publicKey("mint")])

  constructor(fields: SdkItemAliasFields) {
    this.mint = fields.mint
  }

  static async fetch(
    c: Connection,
    address: PublicKey
  ): Promise<SdkItemAlias | null> {
    const info = await c.getAccountInfo(address)

    if (info === null) {
      return null
    }
    if (!info.owner.equals(PROGRAM_ID)) {
      throw new Error("account doesn't belong to this program")
    }

    return this.decode(info.data)
  }

  static async fetchMultiple(
    c: Connection,
    addresses: PublicKey[]
  ): Promise<Array<SdkItemAlias | null>> {
    const infos = await c.getMultipleAccountsInfo(addresses)

    return infos.map((info) => {
      if (info === null) {
        return null
      }
      if (!info.owner.equals(PROGRAM_ID)) {
        throw new Error("account doesn't belong to this program")
      }

      return this.decode(info.data)
    })
  }

  static decode(data: Buffer): SdkItemAlias {
    if (!data.slice(0, 8).equals(SdkItemAlias.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = SdkItemAlias.layout.decode(data.slice(8))

    return new SdkItemAlias({
      mint: dec.mint,
    })
  }

  toJSON(): SdkItemAliasJSON {
    return {
      mint: this.mint.toString(),
    }
  }

  static fromJSON(obj: SdkItemAliasJSON): SdkItemAlias {
    return new SdkItemAlias({
      mint: new PublicKey(obj.mint),
    })
  }
}
