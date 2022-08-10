import * as SdkError from "./SdkError"

export { SdkError }

export type SdkErrorKind =
  | SdkError.WalletAccountIsWrong
  | SdkError.PriceError
  | SdkError.AllItemsAreSold
  | SdkError.NotEnoughFunds
  | SdkError.ObjectIdTooLong
export type SdkErrorJSON =
  | SdkError.WalletAccountIsWrongJSON
  | SdkError.PriceErrorJSON
  | SdkError.AllItemsAreSoldJSON
  | SdkError.NotEnoughFundsJSON
  | SdkError.ObjectIdTooLongJSON
