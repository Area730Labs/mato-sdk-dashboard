export interface Config {
    disable_cache: boolean,
    cluster_url: string,
    rpc_request_interval: number,
    debug_simulate_tx: boolean
}


const global_config: Config = {
    disable_cache: false,
    cluster_url: "https://api.devnet.solana.com",
    rpc_request_interval: 500,
    debug_simulate_tx: false
};

export default global_config; 