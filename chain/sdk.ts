import { createGameProject, CreateGameProjectAccounts, CreateGameProjectArgs } from "./generated/instructions/createGameProject";
import { Keypair, SystemProgram, SYSVAR_RENT_PUBKEY, PublicKey } from "@solana/web3.js"
import { WalletAdapter } from "@solana/wallet-adapter-base";
import { calcAddressWithSeed, calcAddressWithTwoSeeds, string_to_buffer } from "../core/pdautils";
import { createItem, CreateItemAccounts, CreateItemArgs } from "./generated/instructions/createItem";
import BN from "bn.js"
import global_config from "../core/config";
import {
    TOKEN_PROGRAM_ID, 
} from '@solana/spl-token';
import { SdkProject } from "./generated/accounts";

class ChainSdk {

    private signer;

    constructor(s: WalletAdapter) {
        this.signer = s;
    }

    createItem(
        project_id: PublicKey,
        project: SdkProject,
        mint: PublicKey,
        max: number,
        price: number, price_mint: PublicKey,
        id: string, url: string,
    ){

        let id_buffer = string_to_buffer(id);
        let url_buffer = string_to_buffer(url);

        let meta = calcAddressWithSeed("meta", mint);
        let meta_alias = calcAddressWithTwoSeeds("alias",Buffer.from(id_buffer),project.uid);

        const ixArgs: CreateItemArgs = {
            maxItems: new BN(max),
            maxPerUser: new BN(0),
            pricePerItem: new BN(price),
            itemId: id
        };

        const ixAccounts: CreateItemAccounts = {
            project: project_id,
            meta: meta[0],
            metaAlias: meta_alias[0],
            mint: mint,
            authority: this.signer.publicKey,
            priceMint: price_mint,
            tokenProgram: TOKEN_PROGRAM_ID,
            rentProgram: SYSVAR_RENT_PUBKEY,
            systemProgram: SystemProgram.programId
        };

        return createItem(ixArgs, ixAccounts);
    }

    createProject() {

        const uid = new Keypair().publicKey;

        let [project_addr, project_bump] = calcAddressWithSeed("project", uid);
        let [escrow_addr, escrow_bump] = calcAddressWithSeed("escrow", uid);

        const ixArgs: CreateGameProjectArgs = {
            projectBump: project_bump,
            escrowBump: escrow_bump
        };

        const ixAccounts: CreateGameProjectAccounts = {
            uid: uid,
            signer: this.signer.publicKey,
            authority: this.signer.publicKey,
            project: project_addr,
            escrow: escrow_addr,
            rentProgram: SYSVAR_RENT_PUBKEY,
            systemProgram: SystemProgram.programId
        };

        return createGameProject(ixArgs, ixAccounts);
    }
}

export default ChainSdk; 