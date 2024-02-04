type NestedValueOf<T, DeepKey extends string> = DeepKey extends keyof T
  ? T[DeepKey]
  : DeepKey extends `${infer Key extends keyof T & string}.${infer Rest}`
  ? NestedValueOf<T[Key] & object, Rest>
  : never;
