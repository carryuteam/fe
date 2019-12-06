export type Model<S> = {
  namespace: string,
  state: S,
  reducers: Reducers<S>,
  effects?: effects,
  subscriptions?: {
    [props: string]: any
  }
};

interface Reducers<S> {
  [type: string]: (state: S, action: any) => S,
}

interface Put {
  type: string,
  [type: string]: any,
}

interface SagaCommond {
  call: <T>(fn: (...props: any[]) => Promise<T>, ...props: any[]) => T,
  put: (type: Put) => void,
}

interface effects {
  [type: string]: (action, command: SagaCommond) => Generator
}

