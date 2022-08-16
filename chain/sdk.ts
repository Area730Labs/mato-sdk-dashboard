import { createGameProject, CreateGameProjectAccounts, CreateGameProjectArgs } from "./generated/instructions/createGameProject";
import { Keypair, SystemProgram, SYSVAR_RENT_PUBKEY, PublicKey, TransactionInstruction } from "@solana/web3.js"
import { WalletAdapter } from "@solana/wallet-adapter-base";
import { calcAddressWithSeed, calcAddressWithTwoSeeds, findAssociatedTokenAddress, string_to_buffer } from "../core/pdautils";
import { createItem, CreateItemAccounts, CreateItemArgs } from "./generated/instructions/createItem";
import BN from "bn.js"
import {
    TOKEN_PROGRAM_ID,createAssociatedTokenAccountInstruction
} from '@solana/spl-token';
import { SdkProject } from "./generated/accounts";
import { buyGameItem, BuyGameItemAccounts, BuyGameItemArgs } from "./generated/instructions/buyGameItem";
import { SdkItemMeta } from "./generated/accounts/SdkItemMeta";
import { marketList, MarketListAccounts, MarketListArgs } from "./generated/instructions";

class ChainSdk {

    private signer;

    constructor(s: WalletAdapter) {
        this.signer = s;
    }

    createEscrowTokenAccount(project_address: PublicKey, mint: PublicKey) {

        let escrow_account = calcAddressWithSeed("escrow", project_address);

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

        let escrow_account = calcAddressWithSeed("escrow", project_addr);
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
        project_address: PublicKey,
        project: SdkProject,
        mint: PublicKey,
        max: number,
        price: number, price_mint: PublicKey,
        id: string, url: string,
    ) {

        // let id_buffer = string_to_buffer(id);
        // let url_buffer = string_to_buffer(url);

        let escrow_account = calcAddressWithSeed("escrow", project_address);
        let meta = calcAddressWithSeed("meta", mint);
        // let meta_alias = calcAddressWithTwoSeeds("alias",Buffer.from(id_buffer),project.uid);

        const ixArgs: CreateItemArgs = {
            maxItems: new BN(max),
            maxPerUser: new BN(0),
            pricePerItem: new BN(price),
            itemId: id
        };

        // let payment_acc = findAssociatedTokenAddress(escrow_account[0],price_mint);
        // calcAddressWithTwoSeeds("payment_acc",escrow_account[0].toBuffer(),price_mint);

        let payment_acc = calcAddressWithTwoSeeds("payment_acc", price_mint.toBuffer(),escrow_account[0]);
        
        // todo: add project authority
        const ixAccounts: CreateItemAccounts = {
            project: project_address,
            meta: meta[0],
            // metaAlias: meta_alias[0],
            mint: mint,
            authority: this.signer.publicKey,
            priceMint: price_mint,
            tokenProgram: TOKEN_PROGRAM_ID,
            systemProgram: SystemProgram.programId,
            mintAuthority: escrow_account[0],
            paymentTokenAcc: payment_acc[0],
            rent: SYSVAR_RENT_PUBKEY
        };

        return createItem(ixArgs, ixAccounts);
    }


    marketSellItem(
        project_address: PublicKey,
        mint : PublicKey,
        sell_amount: number,
        price_total: number, 
        price_mint: PublicKey,
    ) {

        let market_escrow = calcAddressWithSeed("market_escrow", project_address);
        let meta = calcAddressWithSeed("meta", mint);
        let listing_address = calcAddressWithTwoSeeds("listing",mint.toBuffer(),this.signer.publicKey);
        let market_escrow_tokenacc = calcAddressWithSeed("listing_tacc", listing_address[0]);

        // let seller_payment_acc = findAssociatedTokenAddress(this.signer.publicKey,price_mint);
        let seller_item_acc = findAssociatedTokenAddress(this.signer.publicKey,mint);


        const ixArgs: MarketListArgs = {
            totalPrice: new BN(price_total),
            amount: new BN(sell_amount),
            expireAt: new BN(0)
        };

        // todo: add project authority
        const ixAccounts: MarketListAccounts = {
            project: project_address,
            mint: mint,
            tokenProgram: TOKEN_PROGRAM_ID,
            systemProgram: SystemProgram.programId,
            seller: this.signer.publicKey,
            mintMeta: meta[0],
            listingInfo: listing_address[0],
            marketEscrow: market_escrow[0],
            marketEscrowTokenAccount: market_escrow_tokenacc[0],
            paymentTokenMint: price_mint,
            // paymentTokenAccount: seller_payment_acc,
            sellerItemTokenAccount: seller_item_acc,
            rent: SYSVAR_RENT_PUBKEY
        };

        return marketList(ixArgs, ixAccounts);
    }

    createProject(): [PublicKey,TransactionInstruction] {

        const uid = new Keypair().publicKey;

        let [project_addr, project_bump] = calcAddressWithSeed("project", uid);
        let [escrow_addr, escrow_bump] = calcAddressWithSeed("escrow", project_addr);
        let market_escrow = calcAddressWithSeed("market_escrow", project_addr);

        const ixArgs: CreateGameProjectArgs = {
            projectBump: project_bump,
            escrowBump: escrow_bump,
            marketEscrowBump: market_escrow[1],
        };

        const ixAccounts: CreateGameProjectAccounts = {
            uid: uid,
            signer: this.signer.publicKey,
            authority: this.signer.publicKey,
            project: project_addr,
            escrow: escrow_addr,
            marketEscrow: market_escrow[0],
            rentProgram: SYSVAR_RENT_PUBKEY,
            systemProgram: SystemProgram.programId
        };

        return [project_addr,createGameProject(ixArgs, ixAccounts)];
    }
}

export default ChainSdk; 