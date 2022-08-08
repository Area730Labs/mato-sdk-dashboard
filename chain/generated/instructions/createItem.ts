import { TransactionInstruction, PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@project-serum/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface CreateItemArgs {
  maxItems: BN
  maxPerUser: BN
  pricePerItem: BN
  itemId: Array<number>
  resourceUrl: Array<number>
}

export interface CreateItemAccounts {
  project: PublicKey
  meta: PublicKey
  metaAlias: PublicKey
  mint: PublicKey
  authority: PublicKey
  priceMint: PublicKey
  tokenProgram: PublicKey
  rentProgram: PublicKey
  systemProgram: PublicKey
}

export const layout = borsh.struct([
  borsh.u64("maxItems"),
  borsh.u64("maxPerUser"),
  borsh.u64("pricePerItem"),
  borsh.array(borsh.u8(), 32, "itemId"),
  borsh.array(borsh.u32(), 32, "resourceUrl"),
])

export function createItem(args: CreateItemArgs, accounts: CreateItemAccounts) {
  const keys = [
    { pubkey: accounts.project, isSigner: false, isWritable: false },
    { pubkey: accounts.meta, isSigner: false, isWritable: true },
    { pubkey: accounts.metaAlias, isSigner: false, isWritable: true },
    { pubkey: accounts.mint, isSigner: false, isWritable: true },
    { pubkey: accounts.authority, isSigner: false, isWritable: true },
    { pubkey: accounts.priceMint, isSigner: false, isWritable: false },
    { pubkey: accounts.tokenProgram, isSigner: false, isWritable: false },
    { pubkey: accounts.rentProgram, isSigner: false, isWritable: false },
    { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([176, 125, 142, 227, 8, 231, 222, 237])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      maxItems: args.maxItems,
      maxPerUser: args.maxPerUser,
      pricePerItem: args.pricePerItem,
      itemId: args.itemId,
      resourceUrl: args.resourceUrl,
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId: PROGRAM_ID, data })
  return ix
}
