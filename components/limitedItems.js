

export default function LimitedItems() {
    return (<>
        <p class="not-italic text-center text-xl font-bold m-2.5 mt-4">Limited items</p>

        <table className="text-sm text-left text-gray-500 dark:text-gray-400 m-2 mt-4">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="py-3 px-6">
                            Item name
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Game uid
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Supply
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Price
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Mint
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Golden dragon mount
                        </th>
                        <td className="py-4 px-6">
                            golden-dragon
                        </td>
                        <td className="py-4 px-6">
                            1000
                        </td>
                        <td className="py-4 px-6">
                            USDC 140
                        </td>
                        <td className="py-4 px-6">
                        EPjFWdd5Aufq...
                        <a href="#">
                        <svg class="w-6 h-6 inline ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"></path></svg>
                        </a>
                        </td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Korgi pet
                        </th>
                        <td className="py-4 px-6">
                            pet-korgi
                        </td>
                        <td className="py-4 px-6">
                            500
                        </td>
                        <td className="py-4 px-6">
                            USDC 320
                        </td>
                        <td className="py-4 px-6">
                        EPjFWdd5Aufq...
                        <a href="#">
                        <svg class="w-6 h-6 inline ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"></path></svg>
                        </a>
                        </td>
                    </tr>
                    
                </tbody>
            </table>
    </>);
}