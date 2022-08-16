import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@project-serum/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface SdkItemMetaFields {
  maxItems: BN
  itemsCount: BN
  maxPerUser: BN
  itemId: Array<number>
  price: BN
  priceMint: PublicKey
  inactive: boolean
}

export interface SdkItemMetaJSON {
  maxItems: string
  itemsCount: string
  maxPerUser: string
  itemId: Array<number>
  price: string
  priceMint: string
  inactive: boolean
}

export class SdkItemMeta {
  readonly maxItems: BN
  readonly itemsCount: BN
  readonly maxPerUser: BN
  readonly itemId: Array<number>
  readonly price: BN
  readonly priceMint: PublicKey
  readonly inactive: boolean

  static readonly discriminator = Buffer.from([
    34, 61, 25, 143, 19, 241, 49, 37,
  ])

  static readonly layout = borsh.struct([
    borsh.u64("maxItems"),
    borsh.u64("itemsCount"),
    borsh.u64("maxPerUser"),
    borsh.array(borsh.u8(), 32, "itemId"),
    borsh.u64("price"),
    borsh.publicKey("priceMint"),
    borsh.bool("inactive"),
  ])

  constructor(fields: SdkItemMetaFields) {
    this.maxItems = fields.maxItems
    this.itemsCount = fields.itemsCount
    this.maxPerUser = fields.maxPerUser
    this.itemId = fields.itemId
    this.price = fields.price
    this.priceMint = fields.priceMint
    this.inactive = fields.inactive
  }

  static async fetch(
    c: Connection,
    address: PublicKey
  ): Promise<SdkItemMeta | null> {
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
  ): Promise<Array<SdkItemMeta | null>> {
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

  static decode(data: Buffer): SdkItemMeta {
    if (!data.slice(0, 8).equals(SdkItemMeta.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = SdkItemMeta.layout.decode(data.slice(8))

    return new SdkItemMeta({
      maxItems: dec.maxItems,
      itemsCount: dec.itemsCount,
      maxPerUser: dec.maxPerUser,
      itemId: dec.itemId,
      price: dec.price,
      priceMint: dec.priceMint,
      inactive: dec.inactive,
    })
  }

  toJSON(): SdkItemMetaJSON {
    return {
      maxItems: this.maxItems.toString(),
      itemsCount: this.itemsCount.toString(),
      maxPerUser: this.maxPerUser.toString(),
      itemId: this.itemId,
      price: this.price.toString(),
      priceMint: this.priceMint.toString(),
      inactive: this.inactive,
    }
  }

  static fromJSON(obj: SdkItemMetaJSON): SdkItemMeta {
    return new SdkItemMeta({
      maxItems: new BN(obj.maxItems),
      itemsCount: new BN(obj.itemsCount),
      maxPerUser: new BN(obj.maxPerUser),
      itemId: obj.itemId,
      price: new BN(obj.price),
      priceMint: new PublicKey(obj.priceMint),
      inactive: obj.inactive,
    })
  }
}
