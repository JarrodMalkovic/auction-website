export enum ListingStatus {
  // When the listing is active and users can place bid
  Active = 'Active',

  // The time for the listing has ran out but no one placed a bid
  Expired = 'Expired',

  // The time for the listing has ran out and is awaiting payment from the auction winner
  AwaitingPayment = 'awaiting:payment',

  // The auction winner has paid for the item
  Complete = 'complete',
}
