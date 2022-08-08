import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@project-serum/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface SdkProjectFields {
  authority: PublicKey
  escrow: PublicKey
  uid: PublicKey
  bump: number
  escrowBump: number
}

export interface SdkProjectJSON {
  authority: string
  escrow: string
  uid: string
  bump: number
  escrowBump: number
}

export class SdkProject {
  readonly authority: PublicKey
  readonly escrow: PublicKey
  readonly uid: PublicKey
  readonly bump: number
  readonly escrowBump: number

  static readonly discriminator = Buffer.from([
    27, 88, 211, 108, 68, 30, 244, 70,
  ])

  static readonly layout = borsh.struct([
    borsh.publicKey("authority"),
    borsh.publicKey("escrow"),
    borsh.publicKey("uid"),
    borsh.u8("bump"),
    borsh.u8("escrowBump"),
  ])

  constructor(fields: SdkProjectFields) {
    this.authority = fields.authority
    this.escrow = fields.escrow
    this.uid = fields.uid
    this.bump = fields.bump
    this.escrowBump = fields.escrowBump
  }

  static async fetch(
    c: Connection,
    address: PublicKey
  ): Promise<SdkProject | null> {
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
  ): Promise<Array<SdkProject | null>> {
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

  static decode(data: Buffer): SdkProject {
    if (!data.slice(0, 8).equals(SdkProject.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = SdkProject.layout.decode(data.slice(8))

    return new SdkProject({
      authority: dec.authority,
      escrow: dec.escrow,
      uid: dec.uid,
      bump: dec.bump,
      escrowBump: dec.escrowBump,
    })
  }

  toJSON(): SdkProjectJSON {
    return {
      authority: this.authority.toString(),
      escrow: this.escrow.toString(),
      uid: this.uid.toString(),
      bump: this.bump,
      escrowBump: this.escrowBump,
    }
  }

  static fromJSON(obj: SdkProjectJSON): SdkProject {
    return new SdkProject({
      authority: new PublicKey(obj.authority),
      escrow: new PublicKey(obj.escrow),
      uid: new PublicKey(obj.uid),
      bump: obj.bump,
      escrowBump: obj.escrowBump,
    })
  }
}
