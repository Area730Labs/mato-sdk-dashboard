import { PublicKey } from "@solana/web3.js";
import global_config from "../core/config";
import axios from "axios";

export type Method = "post" | "get";
export interface SdkItem {

    mint: string
    mint_meta: string

    uid: string
    supply: number
    sold: number
    price: number

    price_mint: string
    created_at: string
    last_sold: string
}

class Api {

    private project_key: PublicKey;
    private host: string = global_config.api_base_url;

    constructor(project: PublicKey) {
        this.project_key = project;
    }

    async items(): Promise<SdkItem[]> {

        let pk = this.project_key.toString();

        let result = await this.sendRequest("get", `project/${pk}/items`);

        return result.items;
    }

    private async sendRequest(rm: Method, method: string, args?: any): Promise<any> {

        const url = this.host + method

        try {
            let response_result = await axios.request({
                method: rm,
                url: url,
                data: args,
            })

            if (response_result.data != null) {
                return response_result.data;
            } else {
                throw new Error("no response data were found");
            }
        } catch (e) {
            throw e;
        }
    }


}

export default Api;
