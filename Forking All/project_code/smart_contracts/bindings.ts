import {
  WeilWallet,
  Schema,
  Contract,
  ContractFactory,
  parseSchema,
  parseExecutionResult,
  WeilWalletConnection,
  Option,
} from '@weilliptic/weil-sdk';


export const BaseAgent = ((wallet: WeilWallet | WeilWalletConnection, contractAddress: string) => ({
  run_task: async (task_prompt: string) => {

    const args = parseSchema(
      Schema.args({
        task_prompt: Schema.string,
      }),
      { task_prompt }
    );

    const result = await wallet.contracts.execute(
      contractAddress,
      "run_task",
      args,
    );

    return parseExecutionResult(result, Schema.string);
  },

} satisfies Contract)) satisfies ContractFactory;

