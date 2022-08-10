import { createGameProject, CreateGameProjectAccounts, CreateGameProjectArgs } from "./generated/instructions/createGameProject";
import { Keypair, SystemProgram, SYSVAR_RENT_PUBKEY, PublicKey } from "@solana/web3.js"
import { WalletAdapter } from "@solana/wallet-adapter-base";
import { calcAddressWithSeed, calcAddressWithTwoSeeds, findAssociatedTokenAddress, string_to_buffer } from "../core/pdautils";
import { createItem, CreateItemAccounts, CreateItemArgs } from "./generated/instructions/createItem";
import BN from "bn.js"
import global_config from "../core/config";
import {
    TOKEN_PROGRAM_ID,createAssociatedTokenAccountInstruction
} from '@solana/spl-token';
import { SdkProject } from "./generated/accounts";
import { buyGameItem, BuyGameItemAccounts, BuyGameItemArgs } from "./generated/instructions/buyGameItem";
import { SdkItemMeta } from "./generated/accounts/SdkItemMeta";

class ChainSdk {

    private signer;

    constructor(s: WalletAdapter) {
        this.signer = s;
    }

    createEscrowTokenAccount(project_uid: PublicKey, mint: PublicKey) {

        let escrow_account = calcAddressWithSeed("escrow", project_uid);

        let escrow_payment_addr = findAssociatedTokenAddress(
            escrow_account[0],
            mint
        );

        return createAssociatedTokenAccountInstruction(
            this.signer.publicKey,
            escrow_payment_addr,
            escrow_account[0],
            mint
        );

    } 

    buyItem(
        project_addr: PublicKey,
        project: SdkProject,
        mint: PublicKey,
        mint_meta: SdkItemMeta
    ) {

        const ixArgs: BuyGameItemArgs = {
            items: new BN(1),
        };

        let signer_payment_account = findAssociatedTokenAddress(
            this.signer.publicKey,
            mint_meta.priceMint
        );

        let dest_addr = findAssociatedTokenAddress(
            this.signer.publicKey,
            mint
        );

        // create if not exists 

        let escrow_account = calcAddressWithSeed("escrow", project.uid);
        let escrow_payment_addr = findAssociatedTokenAddress(
            escrow_account[0],
            mint_meta.priceMint
        );

        let meta = calcAddressWithSeed("meta", mint);

        // todo: add project authority
        const ixAccounts: BuyGameItemAccounts = {
            signer: this.signer.publicKey,
            project: project_addr,
            mintAuthority: project.escrow,
            mint: mint,
            buyerItemTokenAccount: dest_addr,
            buyerPaymentTokenAccount: signer_payment_account,
            escrowPaymentTokenAccount: escrow_payment_addr,
            mintMeta: meta[0],
            tokenProgram: TOKEN_PROGRAM_ID
        };

        return buyGameItem(ixArgs, ixAccounts);

    }

    createItem(
        project_id: PublicKey,
        project: SdkProject,
        mint: PublicKey,
        max: number,
        price: number, price_mint: PublicKey,
        id: string, url: string,
    ) {

        let id_buffer = string_to_buffer(id);
        let url_buffer = string_to_buffer(url);

        let escrow_account = calcAddressWithSeed("escrow", project.uid);
        let meta = calcAddressWithSeed("meta", mint);
        // let meta_alias = calcAddressWithTwoSeeds("alias",Buffer.from(id_buffer),project.uid);

        const ixArgs: CreateItemArgs = {
            maxItems: new BN(max),
            maxPerUser: new BN(0),
            pricePerItem: new BN(price),
            itemId: id
        };

        // todo: add project authority
        const ixAccounts: CreateItemAccounts = {
            project: project_id,
            meta: meta[0],
            // metaAlias: meta_alias[0],
            mint: mint,
            authority: this.signer.publicKey,
            priceMint: price_mint,
            tokenProgram: TOKEN_PROGRAM_ID,
            rentProgram: SYSVAR_RENT_PUBKEY,
            systemProgram: SystemProgram.programId,
            mintAuthority: escrow_account[0]
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