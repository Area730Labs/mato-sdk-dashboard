import { TransactionInstruction, PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@project-serum/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface MarketBuyAccounts {
  buyer: PublicKey
  seller: PublicKey
  project: PublicKey
  mint: PublicKey
  listingInfo: PublicKey
  marketEscrow: PublicKey
  marketEscrowTokenAccount: PublicKey
  paymentTokenMint: PublicKey
  sellerPaymentTokenAccount: PublicKey
  paymentBuyerTokenAccount: PublicKey
  buyerItemTokenAccount: PublicKey
  tokenProgram: PublicKey
}

export function marketBuy(accounts: MarketBuyAccounts) {
  const keys = [
    { pubkey: accounts.buyer, isSigner: true, isWritable: true },
    { pubkey: accounts.seller, isSigner: false, isWritable: true },
    { pubkey: accounts.project, isSigner: false, isWritable: false },
    { pubkey: accounts.mint, isSigner: false, isWritable: false },
    { pubkey: accounts.listingInfo, isSigner: false, isWritable: true },
    { pubkey: accounts.marketEscrow, isSigner: false, isWritable: false },
    {
      pubkey: accounts.marketEscrowTokenAccount,
      isSigner: false,
      isWritable: true,
    },
    { pubkey: accounts.paymentTokenMint, isSigner: false, isWritable: false },
    {
      pubkey: accounts.sellerPaymentTokenAccount,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: accounts.paymentBuyerTokenAccount,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: accounts.buyerItemTokenAccount,
      isSigner: false,
      isWritable: true,
    },
    { pubkey: accounts.tokenProgram, isSigner: false, isWritable: true },
  ]
  const identifier = Buffer.from([90, 236, 106, 220, 221, 81, 108, 140])
  const data = identifier
  const ix = new TransactionInstruction({ keys, programId: PROGRAM_ID, data })
  return ix
}
