export class PaymentMethod {
    public id!: number;
    public cardType: string;
    public cardHolderName: string;
    public expirationMonth: string;
    public expirationYear: string;
    public cardNumber: number;
    public cvc: number;
    public paymentMethodBillingAddressLine1: string;
    public paymentMethodBillingAddressLine2: string;
    public paymentMethodBillingCity: string;
    public paymentMethodBillingState: string;
    public paymentMethodBillingZipCode: number;
    public paymentMethodBillingCountry: string;
    public defaultPaymentMethod: boolean;


    constructor() {
        this.cardType = "";
        this.cardHolderName = "";
        this.expirationMonth = "";
        this.expirationYear = "";
        this.cardNumber = 0;
        this.cvc = 0;
        this.paymentMethodBillingAddressLine1 = "";
        this.paymentMethodBillingAddressLine2 = "";
        this.paymentMethodBillingCity = "";
        this.paymentMethodBillingState = "";
        this.paymentMethodBillingZipCode = 0;
        this.paymentMethodBillingCountry = "";
        this.defaultPaymentMethod = false;

    }
}
