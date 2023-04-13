import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal,
} from "@graphprotocol/graph-ts";

export class Game extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("maxPlayers", Value.fromI32(0));
    this.set("entryFee", Value.fromBigInt(BigInt.zero()));
    this.set("players", Value.fromBytesArray(new Array(0)));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Game entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Game entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Game", id.toString(), this);
    }
  }

  static load(id: string): Game | null {
    return changetype<Game | null>(store.get("Game", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get maxPlayers(): i32 {
    let value = this.get("maxPlayers");
    return value!.toI32();
  }

  set maxPlayers(value: i32) {
    this.set("maxPlayers", Value.fromI32(value));
  }

  get entryFee(): BigInt {
    let value = this.get("entryFee");
    return value!.toBigInt();
  }

  set entryFee(value: BigInt) {
    this.set("entryFee", Value.fromBigInt(value));
  }

  get winner(): Bytes | null {
    let value = this.get("winner");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set winner(value: Bytes | null) {
    if (!value) {
      this.unset("winner");
    } else {
      this.set("winner", Value.fromBytes(<Bytes>value));
    }
  }

  get requestId(): BigInt | null {
    let value = this.get("requestId");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value!.toBigInt();
    }
  }

  set requestId(value: BigInt | null) {
    if (!value) {
      this.unset("requestId");
    } else {
      this.set("requestId", Value.fromBigInt(value));
    }
  }

  get players(): Array<Bytes> {
    let value = this.get("players");
    return value!.toBytesArray();
  }

  set players(value: Array<Bytes>) {
    this.set("players", Value.fromBytesArray(value));
  }
}
