import { TransactionInstruction, PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@project-serum/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface BuyGameItemArgs {
  items: BN
}

export interface BuyGameItemAccounts {
  signer: PublicKey
  project: PublicKey
  walletAuthority: PublicKey
  mint: PublicKey
  buyerTokenAccount: PublicKey
  escrowTokenAccount: PublicKey
  mintMeta: PublicKey
  tokenProgram: PublicKey
}

export const layout = borsh.struct([borsh.u64("items")])

export function buyGameItem(
  args: BuyGameItemArgs,
  accounts: BuyGameItemAccounts
) {
  const keys = [
    { pubkey: accounts.signer, isSigner: false, isWritable: true },
    { pubkey: accounts.project, isSigner: false, isWritable: true },
    { pubkey: accounts.walletAuthority, isSigner: false, isWritable: true },
    { pubkey: accounts.mint, isSigner: false, isWritable: true },
    { pubkey: accounts.buyerTokenAccount, isSigner: false, isWritable: true },
    { pubkey: accounts.escrowTokenAccount, isSigner: false, isWritable: true },
    { pubkey: accounts.mintMeta, isSigner: false, isWritable: true },
    { pubkey: accounts.tokenProgram, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([63, 183, 140, 163, 114, 169, 128, 3])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      items: args.items,
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId: PROGRAM_ID, data })
  return ix
}
