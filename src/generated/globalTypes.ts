/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum CommodityType {
  CURRENCY = 'CURRENCY',
  MATERIAL_1M = 'MATERIAL_1M',
}

export enum Infrastructure {
  ANIMAL_FARM = 'ANIMAL_FARM',
  APARTMENTS = 'APARTMENTS',
  BANK = 'BANK',
  EMPTY = 'EMPTY',
  HOUSE = 'HOUSE',
  JUNGLE = 'JUNGLE',
  NUCLEAR_PLANT = 'NUCLEAR_PLANT',
  PORT = 'PORT',
  QUARRY = 'QUARRY',
  WHEAT_FIELD = 'WHEAT_FIELD',
  WIND_TURBINE = 'WIND_TURBINE',
}

export enum InfrastructureStatus {
  OFF = 'OFF',
  ON = 'ON',
}

export enum OrderSide {
  BUY = 'BUY',
  SELL = 'SELL',
}

export enum TileKind {
  DEEP_WATER = 'DEEP_WATER',
  LAND = 'LAND',
  SAND = 'SAND',
  WATER = 'WATER',
}

export interface EventsInput {
  readonly userId: string;
  readonly limit: number;
  readonly startAt?: number | null;
}

export interface OrdersInput {
  readonly side: OrderSide;
  readonly currencyId: string;
  readonly commodity: CommodityType;
  readonly commodityCurrencyId?: string | null;
}

export interface SendOrderInput {
  readonly userId: string;
  readonly expiresAt: any;
  readonly side: OrderSide;
  readonly currencyId: string;
  readonly commodity: CommodityType;
  readonly commodityCurrencyId?: string | null;
  readonly quantity: number;
  readonly price: number;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
