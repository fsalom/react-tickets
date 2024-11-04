export class Token {
    value: string;
    expireDate: Date | null;
    expireInt: number | null;

    constructor(value: string, expireInt: number | null) {
        this.value = value;
        this.expireInt = expireInt;
        this.expireDate = this.parseDate(expireInt);
    }

    get isValid(): boolean {
        return this.expireDate !== null && this.expireDate > new Date();
    }

    private parseDate(value: number | null): Date | null {
        if (!value) {
            return new Date(Date.now() + 31540000 * 1000); // 1 año en segundos
        }
        return new Date(Date.now() + value * 1000);
    }
}