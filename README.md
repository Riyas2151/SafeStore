# SafeStore
Ecommerce website for safefreeze


Current Flow (Regular Buyer):
ContractPage.js → User fills contract → ✅ email sent to both.

Redirect to PaymentPage.js (PaytmInterface.js) → after success → ✅ escrow email sent.

Redirect to TrackPage.js (TrackProduct.js) → user sees condition checklist.

When marked "Done" → ✅ toast, payment released.

HistoryPage.js → Buyer can view previous purchases/contracts.