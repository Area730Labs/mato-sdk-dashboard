import { PublicKey } from "@solana/web3.js";

export interface Config {
    disable_cache: boolean,
    cluster_url: string,
    rpc_request_interval: number,
    debug_simulate_tx: boolean,
    program_id: PublicKey
}


const global_config: Config = {
    disable_cache: false,
    cluster_url: "https://api.devnet.solana.com",
    rpc_request_interval: 500,
    debug_simulate_tx: false,
    program_id: new PublicKey("GSdkVPb9aMMY43TNcHeocHvC1KCYxWiTs2ey79hKMsYN")
};

export default global_config; 