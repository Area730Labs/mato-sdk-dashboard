import { TransactionInstruction, PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@project-serum/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface MarketListArgs {
  totalPrice: BN
  amount: BN
  expireAt: BN
}

export interface MarketListAccounts {
  seller: PublicKey
  project: PublicKey
  mint: PublicKey
  mintMeta: PublicKey
  listingInfo: PublicKey
  marketEscrow: PublicKey
  marketEscrowTokenAccount: PublicKey
  paymentTokenMint: PublicKey
  sellerItemTokenAccount: PublicKey
  systemProgram: PublicKey
  tokenProgram: PublicKey
  rent: PublicKey
}

export const layout = borsh.struct([
  borsh.u64("totalPrice"),
  borsh.u64("amount"),
  borsh.u64("expireAt"),
])

export function marketList(args: MarketListArgs, accounts: MarketListAccounts) {
  const keys = [
    { pubkey: accounts.seller, isSigner: true, isWritable: true },
    { pubkey: accounts.project, isSigner: false, isWritable: false },
    { pubkey: accounts.mint, isSigner: false, isWritable: false },
    { pubkey: accounts.mintMeta, isSigner: false, isWritable: true },
    { pubkey: accounts.listingInfo, isSigner: false, isWritable: true },
    { pubkey: accounts.marketEscrow, isSigner: false, isWritable: false },
    {
      pubkey: accounts.marketEscrowTokenAccount,
      isSigner: false,
      isWritable: true,
    },
    { pubkey: accounts.paymentTokenMint, isSigner: false, isWritable: false },
    {
      pubkey: accounts.sellerItemTokenAccount,
      isSigner: false,
      isWritable: true,
    },
    { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
    { pubkey: accounts.tokenProgram, isSigner: false, isWritable: false },
    { pubkey: accounts.rent, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([153, 21, 165, 25, 43, 65, 123, 52])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      totalPrice: args.totalPrice,
      amount: args.amount,
      expireAt: args.expireAt,
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId: PROGRAM_ID, data })
  return ix
}
