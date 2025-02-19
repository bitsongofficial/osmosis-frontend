import { ChainGetter, ObservableChainQuery, QueryResponse } from "@keplr-wallet/stores";
import { KVStore } from "@keplr-wallet/common";
import { Currency } from "@keplr-wallet/types";
import { CoinPretty, Int, IntPretty, RatePretty } from "@keplr-wallet/unit";
import { PricePretty } from "@keplr-wallet/unit/build/price-pretty";
import { Pool, WeightedPoolRaw } from "@osmosis-labs/pools";
import { IPriceStore } from "src/price";
export declare class ObservableQueryPool extends ObservableChainQuery<{
    pool: WeightedPoolRaw;
}> {
    readonly kvStore: KVStore;
    readonly chainGetter: ChainGetter;
    protected raw: WeightedPoolRaw;
    /** Constructed with the assumption that initial pool data has already been fetched
     *  using the `/pools` endpoint.
     **/
    constructor(kvStore: KVStore, chainId: string, chainGetter: ChainGetter, raw: WeightedPoolRaw);
    protected setResponse(response: Readonly<QueryResponse<{
        pool: WeightedPoolRaw;
    }>>): void;
    setRaw(raw: WeightedPoolRaw): void;
    get pool(): Pool;
    get id(): string;
    get swapFee(): RatePretty;
    get exitFee(): RatePretty;
    get shareDenom(): string;
    get shareCurrency(): Currency;
    get totalShare(): CoinPretty;
    get totalWeight(): IntPretty;
    get poolAssets(): {
        amount: CoinPretty;
        weight: IntPretty;
        weightFraction: RatePretty;
    }[];
    readonly getPoolAsset: (denom: string) => {
        amount: CoinPretty;
        weight: IntPretty;
        weightFraction: RatePretty;
    };
    readonly getSpotPriceInOverOut: (tokenInDenom: string, tokenOutDenom: string) => IntPretty;
    readonly getSpotPriceOutOverIn: (tokenInDenom: string, tokenOutDenom: string) => IntPretty;
    readonly getSpotPriceInOverOutWithoutSwapFee: (tokenInDenom: string, tokenOutDenom: string) => IntPretty;
    getSpotPriceOutOverInWithoutSwapFee: (tokenInDenom: string, tokenOutDenom: string) => IntPretty;
    getTokenOutByTokenIn(tokenIn: {
        denom: string;
        amount: Int;
    }, tokenOutDenom: string): {
        amount: CoinPretty;
        afterSpotPriceInOverOut: IntPretty;
        afterSpotPriceOutOverIn: IntPretty;
        effectivePriceInOverOut: IntPretty;
        effectivePriceOutOverIn: IntPretty;
        slippage: RatePretty;
    };
    protected readonly getTokenOutByTokenInComputedFn: (tokenInDenom: string, tokenInAmount: string, tokenOutDenom: string) => {
        amount: CoinPretty;
        afterSpotPriceInOverOut: IntPretty;
        afterSpotPriceOutOverIn: IntPretty;
        effectivePriceInOverOut: IntPretty;
        effectivePriceOutOverIn: IntPretty;
        slippage: RatePretty;
    };
    getTokenInByTokenOut(tokenOut: {
        denom: string;
        amount: Int;
    }, tokenInDenom: string): {
        amount: CoinPretty;
        afterSpotPriceInOverOut: IntPretty;
        afterSpotPriceOutOverIn: IntPretty;
        effectivePriceInOverOut: IntPretty;
        effectivePriceOutOverIn: IntPretty;
        slippage: RatePretty;
    };
    protected readonly getTokenInByTokenOutComputedFn: (tokenOutDenom: string, tokenOutAmount: string, tokenInDenom: string) => {
        amount: CoinPretty;
        afterSpotPriceInOverOut: IntPretty;
        afterSpotPriceOutOverIn: IntPretty;
        effectivePriceInOverOut: IntPretty;
        effectivePriceOutOverIn: IntPretty;
        slippage: RatePretty;
    };
    readonly computeTotalValueLocked: (priceStore: IPriceStore) => PricePretty;
}
