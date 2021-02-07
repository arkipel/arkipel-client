class BankAccount {
  constructor(obj: any) {
    this.id = obj?.id || '';
    this.currencyCode = obj?.currency.code || '';
    this.currencyName = obj?.currency.name || '';
    this.owner = obj?.owner || '';
    this.amount = obj?.amount || 0;
  }

  id: string;
  currencyCode: string;
  currencyName: string;
  owner: string;
  amount: number;

  currencyCodeStr(): string {
    return this.currencyCode.toUpperCase();
  }

  amountStr(): string {
    return this.amount.toLocaleString('en', {});
  }
}

export default BankAccount;
