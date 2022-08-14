import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@project-serum/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface ListingFields {
  project: PublicKey
  mint: PublicKey
  seller: PublicKey
  saleAmount: BN
  salePriceTotal: BN
  saleExpireAt: BN
  paymentTokenMint: PublicKey
  marketEscrowTokenAccount: PublicKey
}

export interface ListingJSON {
  project: string
  mint: string
  seller: string
  saleAmount: string
  salePriceTotal: string
  saleExpireAt: string
  paymentTokenMint: string
  marketEscrowTokenAccount: string
}

export class Listing {
  readonly project: PublicKey
  readonly mint: PublicKey
  readonly seller: PublicKey
  readonly saleAmount: BN
  readonly salePriceTotal: BN
  readonly saleExpireAt: BN
  readonly paymentTokenMint: PublicKey
  readonly marketEscrowTokenAccount: PublicKey

  static readonly discriminator = Buffer.from([
    218, 32, 50, 73, 43, 134, 26, 58,
  ])

  static readonly layout = borsh.struct([
    borsh.publicKey("project"),
    borsh.publicKey("mint"),
    borsh.publicKey("seller"),
    borsh.u64("saleAmount"),
    borsh.u64("salePriceTotal"),
    borsh.u64("saleExpireAt"),
    borsh.publicKey("paymentTokenMint"),
    borsh.publicKey("marketEscrowTokenAccount"),
  ])

  constructor(fields: ListingFields) {
    this.project = fields.project
    this.mint = fields.mint
    this.seller = fields.seller
    this.saleAmount = fields.saleAmount
    this.salePriceTotal = fields.salePriceTotal
    this.saleExpireAt = fields.saleExpireAt
    this.paymentTokenMint = fields.paymentTokenMint
    this.marketEscrowTokenAccount = fields.marketEscrowTokenAccount
  }

  static async fetch(
    c: Connection,
    address: PublicKey
  ): Promise<Listing | null> {
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
  ): Promise<Array<Listing | null>> {
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

  static decode(data: Buffer): Listing {
    if (!data.slice(0, 8).equals(Listing.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = Listing.layout.decode(data.slice(8))

    return new Listing({
      project: dec.project,
      mint: dec.mint,
      seller: dec.seller,
      saleAmount: dec.saleAmount,
      salePriceTotal: dec.salePriceTotal,
      saleExpireAt: dec.saleExpireAt,
      paymentTokenMint: dec.paymentTokenMint,
      marketEscrowTokenAccount: dec.marketEscrowTokenAccount,
    })
  }

  toJSON(): ListingJSON {
    return {
      project: this.project.toString(),
      mint: this.mint.toString(),
      seller: this.seller.toString(),
      saleAmount: this.saleAmount.toString(),
      salePriceTotal: this.salePriceTotal.toString(),
      saleExpireAt: this.saleExpireAt.toString(),
      paymentTokenMint: this.paymentTokenMint.toString(),
      marketEscrowTokenAccount: this.marketEscrowTokenAccount.toString(),
    }
  }

  static fromJSON(obj: ListingJSON): Listing {
    return new Listing({
      project: new PublicKey(obj.project),
      mint: new PublicKey(obj.mint),
      seller: new PublicKey(obj.seller),
      saleAmount: new BN(obj.saleAmount),
      salePriceTotal: new BN(obj.salePriceTotal),
      saleExpireAt: new BN(obj.saleExpireAt),
      paymentTokenMint: new PublicKey(obj.paymentTokenMint),
      marketEscrowTokenAccount: new PublicKey(obj.marketEscrowTokenAccount),
    })
  }
}
