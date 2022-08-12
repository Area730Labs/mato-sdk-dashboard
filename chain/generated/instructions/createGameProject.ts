import { TransactionInstruction, PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@project-serum/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface CreateGameProjectArgs {
  projectBump: number
  escrowBump: number
  marketEscrowBump: number
}

export interface CreateGameProjectAccounts {
  uid: PublicKey
  signer: PublicKey
  authority: PublicKey
  project: PublicKey
  escrow: PublicKey
  marketEscrow: PublicKey
  rentProgram: PublicKey
  systemProgram: PublicKey
}

export const layout = borsh.struct([
  borsh.u8("projectBump"),
  borsh.u8("escrowBump"),
  borsh.u8("marketEscrowBump"),
])

export function createGameProject(
  args: CreateGameProjectArgs,
  accounts: CreateGameProjectAccounts
) {
  const keys = [
    { pubkey: accounts.uid, isSigner: false, isWritable: false },
    { pubkey: accounts.signer, isSigner: true, isWritable: true },
    { pubkey: accounts.authority, isSigner: false, isWritable: false },
    { pubkey: accounts.project, isSigner: false, isWritable: true },
    { pubkey: accounts.escrow, isSigner: false, isWritable: false },
    { pubkey: accounts.marketEscrow, isSigner: false, isWritable: false },
    { pubkey: accounts.rentProgram, isSigner: false, isWritable: false },
    { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([208, 141, 73, 113, 101, 204, 116, 232])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      projectBump: args.projectBump,
      escrowBump: args.escrowBump,
      marketEscrowBump: args.marketEscrowBump,
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId: PROGRAM_ID, data })
  return ix
}
