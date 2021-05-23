export type ActionFN<P = void> = (text: P) => {
  type: string;
  text: P;
};

export type UseActionType<P> = ActionFN<P> | { [key: string]: ActionFN<P>[] };
