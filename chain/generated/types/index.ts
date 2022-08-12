import * as SdkError from "./SdkError"

export { SdkError }

export type SdkErrorKind =
  | SdkError.WalletAccountIsWrong
  | SdkError.PriceError
  | SdkError.AllItemsAreSold
  | SdkError.NotEnoughFunds
  | SdkError.ObjectIdTooLong
  | SdkError.MarketEscrowError
  | SdkError.ListingInfoHacked
export type SdkErrorJSON =
  | SdkError.WalletAccountIsWrongJSON
  | SdkError.PriceErrorJSON
  | SdkError.AllItemsAreSoldJSON
  | SdkError.NotEnoughFundsJSON
  | SdkError.ObjectIdTooLongJSON
  | SdkError.MarketEscrowErrorJSON
  | SdkError.ListingInfoHackedJSON
