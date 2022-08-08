import { createGameProject, CreateGameProjectAccounts, CreateGameProjectArgs } from "./generated/instructions/createGameProject";
import {Keypair} from "@solana/web3.js"


class ChainSdkImpl {

    private signer;

    createProject() {

        const uid = new Keypair().publicKey;
        
        const ixArgs = {} as CreateGameProjectArgs;
        const ixAccounts = {} as CreateGameProjectAccounts;

        createGameProject(ixArgs,ixAccounts);
    }
}

const ChainSdk = {

    

    
};

export default ChainSdk; 