export let CreateInvoiceBodyPreFilled = {
    "UBLID": 2.1,
    "CustomizationID": "urn:cen.eu:en16931:2017#conformant#urn:fdc:peppol.eu:2017:poacc:billing:international:aunz:3.0",
    "ProfileID": "urn:fdc:peppol.eu:2017:poacc:billing:01:1.0",
    "InvoiceTaxID": 5,
    "InvoiceCode": 380,
    "AddDocReference": "ebwasp1002",
    "PaymentType": 1,
    "PaymentID": "EBWASP1002",
    "TaxID": "S",
    "SupplierID": 1,
    "BuyerReference": "EBWASP1002"
}

export const CreateInvoiceInputFields = [
    'InvoiceID',
    'InvoiceTaxSchemeID',
    'InvoiceName',
    'IssueDate',
    'PayableAmount',
    'InvoiceQuantity',
    'Currency',
    'PaymentTerms',
    'TaxAmount',
    'TaxableAmount',
    'TaxExclusiveAmount',
    'TaxInclusiveAmount',
    'TaxSchemeID',
    'SupplierRegistration',
    'SupplierStreet',
    'SupplierCity',
    'SupplierPost',
    'SupplierCountry',
    'CustomerRegistration',
    'CustomerStreet',
    'CustomerCity',
    'CustomerPost',
    'CustomerCountry'
]