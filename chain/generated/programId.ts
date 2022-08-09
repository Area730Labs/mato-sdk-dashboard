import { PublicKey } from "@solana/web3.js"
import global_config from "../../core/config"

// This constant will not get overwritten on subsequent code generations and it's safe to modify it's value.
export const PROGRAM_ID: PublicKey = global_config.program_id
