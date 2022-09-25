export type AppMessage<
  TDM extends AnyObject,
  T extends string & keyof TDM = string & keyof TDM
> = {
  type: T;
  data?: TDM[T];
};

export function isMessage<TDM extends AnyObject, T extends string & keyof TDM>(
  msg: AppMessage<TDM>,
  type: T | T[]
): msg is AppMessage<TDM, T> {
  if (Array.isArray(type)) {
    return type.includes((msg as AppMessage<TDM, T>).type);
  }
  return type === (msg as AppMessage<TDM, T>).type;
}
