export class OrderDto {
  constructor(
    public readonly email: string,
    public readonly productName: string,
    public readonly quantity: number,
  ) {}
}
