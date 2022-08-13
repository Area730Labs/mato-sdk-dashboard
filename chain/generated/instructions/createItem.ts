import { TransactionInstruction, PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@project-serum/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface CreateItemArgs {
  itemId: string
  maxItems: BN
  maxPerUser: BN
  pricePerItem: BN
}

export interface CreateItemAccounts {
  project: PublicKey
  meta: PublicKey
  mint: PublicKey
  authority: PublicKey
  mintAuthority: PublicKey
  priceMint: PublicKey
  paymentTokenAcc: PublicKey
  tokenProgram: PublicKey
  systemProgram: PublicKey
  rent: PublicKey
}

export const layout = borsh.struct([
  borsh.str("itemId"),
  borsh.u64("maxItems"),
  borsh.u64("maxPerUser"),
  borsh.u64("pricePerItem"),
])

export function createItem(args: CreateItemArgs, accounts: CreateItemAccounts) {
  const keys = [
    { pubkey: accounts.project, isSigner: false, isWritable: false },
    { pubkey: accounts.meta, isSigner: false, isWritable: true },
    { pubkey: accounts.mint, isSigner: true, isWritable: true },
    { pubkey: accounts.authority, isSigner: true, isWritable: true },
    { pubkey: accounts.mintAuthority, isSigner: false, isWritable: true },
    { pubkey: accounts.priceMint, isSigner: false, isWritable: false },
    { pubkey: accounts.paymentTokenAcc, isSigner: false, isWritable: true },
    { pubkey: accounts.tokenProgram, isSigner: false, isWritable: false },
    { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
    { pubkey: accounts.rent, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([176, 125, 142, 227, 8, 231, 222, 237])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      itemId: args.itemId,
      maxItems: args.maxItems,
      maxPerUser: args.maxPerUser,
      pricePerItem: args.pricePerItem,
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId: PROGRAM_ID, data })
  return ix
}
