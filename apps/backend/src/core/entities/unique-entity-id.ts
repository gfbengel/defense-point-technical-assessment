import { ulid } from 'ulidx'

export class UniqueEntityId {
  private value: string

  toString() {
    return this.value
  }

  toValue() {
    return this.value
  }

  constructor(value?: string) {
    this.value = value ?? ulid()
  }

  public equals(id: UniqueEntityId) {
    return id.toValue() === this.value
  }
}
