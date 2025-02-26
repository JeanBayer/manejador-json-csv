export type Primitives = string | number | boolean | null | undefined;
export type Key = string | number | symbol;

export interface NestedRecord {
  [key: string]: Primitives | NestedRecord | NestedRecord[];
}

export type Value = Primitives | Primitives[] | NestedRecord | NestedRecord[];

export type OutPutItemJSON<T = object> = Record<Key, Value> & T;

export type MatchOuput = {
  match: boolean;
};

export type DuplicateOutput = {
  duplicate: boolean;
};

export type ComplexDuplicateOutput = {
  estado: string;
  eliminar: boolean;
  reglaEliminacion: string;
};
