import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Decimal: { input: any; output: any; }
  JSON: { input: any; output: any; }
  Time: { input: any; output: any; }
};

export type ApiStatus = {
  __typename?: 'APIStatus';
  running: Scalars['Boolean']['output'];
};

export type AccountCreation = Event & {
  __typename?: 'AccountCreation';
  happenedAt: Scalars['Time']['output'];
  id: Scalars['Int']['output'];
  user?: Maybe<User>;
};

export type AlreadyExists = {
  __typename?: 'AlreadyExists';
  identifier?: Maybe<Scalars['String']['output']>;
};

export type Archipelago = {
  __typename?: 'Archipelago';
  id: Scalars['ID']['output'];
  numberIslands: Scalars['Int']['output'];
};

export type Article = {
  __typename?: 'Article';
  content: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  publishedAt: Scalars['Time']['output'];
  title: Scalars['String']['output'];
};

export type ArticleInput = {
  articleId: Scalars['ID']['input'];
};

export type ArticleList = {
  __typename?: 'ArticleList';
  articles: Array<Article>;
};

export type ArticleResult = Article | NotFound;

export type Badge = {
  __typename?: 'Badge';
  createdAt: Scalars['Time']['output'];
  id: Scalars['ID']['output'];
  owner: Player;
  recipient: Player;
  type: BadgeType;
};

export enum BadgeType {
  EarlyPlayer = 'EARLY_PLAYER'
}

export type BankAccount = {
  __typename?: 'BankAccount';
  amount: Scalars['Decimal']['output'];
  currency: Currency;
  id: Scalars['ID']['output'];
  owner: User;
};

export type BankAccountList = {
  __typename?: 'BankAccountList';
  bankAccounts: Array<BankAccount>;
};

export type BankAccountResult = BankAccount | NotAuthorized | NotFound;

export type BankAccountsResult = BankAccountList | NotAuthorized;

export type Blueprint = {
  __typename?: 'Blueprint';
  infrastructure: Infrastructure;
  materialCost: Scalars['Int']['output'];
  workload: Scalars['Int']['output'];
};

export type BuildInfrastructureResult = NotAuthorized | NotEnoughMaterial | NotFound | Tile;

export type BuildingScore = {
  __typename?: 'BuildingScore';
  id: Scalars['String']['output'];
  score: Scalars['Int']['output'];
  tile: Tile;
};

export type BuyTradeOrderExecution = Event & {
  __typename?: 'BuyTradeOrderExecution';
  buyer: User;
  commodity: CommodityType;
  commodityCurrency?: Maybe<Currency>;
  currency: Currency;
  happenedAt: Scalars['Time']['output'];
  id: Scalars['Int']['output'];
  price: Scalars['Decimal']['output'];
  quantity: Scalars['Int']['output'];
  seller: User;
  user?: Maybe<User>;
};

export type CancelConstructionResult = NotAuthorized | NotFound | Tile;

export type CancelTradeOrderResult = Confirmation | NotAuthorized | NotFound;

export type Citizen = {
  __typename?: 'Citizen';
  createdAt: Scalars['Time']['output'];
  id: Scalars['ID']['output'];
  island: Island;
  name: Scalars['String']['output'];
};

export type CitizenInput = {
  citizenId: Scalars['ID']['input'];
};

export type CitizenList = {
  __typename?: 'CitizenList';
  citizens: Array<Citizen>;
};

export type CitizenResult = Citizen | NotFound;

export type CitizensFromIslandInput = {
  islandId: Scalars['ID']['input'];
};

export type CitizensFromIslandResult = CitizenList | NotFound;

export type CommodityPrice = {
  __typename?: 'CommodityPrice';
  commodity: CommodityType;
  price: Scalars['Decimal']['output'];
};

export type CommodityScore = {
  __typename?: 'CommodityScore';
  commodity: CommodityType;
  id: Scalars['String']['output'];
  score: Scalars['Int']['output'];
};

export enum CommodityType {
  Currency = 'CURRENCY',
  FrozenFood = 'FROZEN_FOOD',
  Material = 'MATERIAL'
}

export type Confirmation = {
  __typename?: 'Confirmation';
  identifier?: Maybe<Scalars['String']['output']>;
};

export type ConstructionSite = {
  __typename?: 'ConstructionSite';
  createdAt: Scalars['Time']['output'];
  finishedAt: Scalars['Time']['output'];
  id: Scalars['ID']['output'];
  infrastructure: Infrastructure;
  materialSpent: Scalars['Int']['output'];
  tile: Tile;
  workloadLeft: Scalars['Int']['output'];
};

export type CurrenciesResult = CurrencyList;

export type Currency = {
  __typename?: 'Currency';
  code: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type CurrencyList = {
  __typename?: 'CurrencyList';
  currencies: Array<Currency>;
};

export type CurrencyPrice = {
  __typename?: 'CurrencyPrice';
  currency: Currency;
  price: Scalars['Decimal']['output'];
};

export type CurrencyResult = Currency | NotFound;

export type CurrencyScore = {
  __typename?: 'CurrencyScore';
  currency: Currency;
  id: Scalars['String']['output'];
  score: Scalars['Int']['output'];
};

export type CurrentMarketPrices = {
  __typename?: 'CurrentMarketPrices';
  commodityPrices: Array<CommodityPrice>;
  currency: Currency;
  currencyPrices: Array<CurrencyPrice>;
};

export type CurrentMarketPricesInput = {
  currencyId: Scalars['ID']['input'];
};

export type CurrentMarketPricesResult = CurrentMarketPrices | NotFound;

export type DeleteEmailAddressResult = NotAuthorized | User;

export type DestroyInfrastructureResult = NotAuthorized | Tile;

export type EditArticleInput = {
  articleId: Scalars['ID']['input'];
  content?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type EditArticleResult = Article | NotAuthorized | NotFound;

export type Event = {
  happenedAt: Scalars['Time']['output'];
  id: Scalars['Int']['output'];
  user?: Maybe<User>;
};

export type EventList = {
  __typename?: 'EventList';
  events: Array<Event>;
};

export type EventsInput = {
  limit: Scalars['Int']['input'];
  startAt?: InputMaybe<Scalars['Int']['input']>;
  userId: Scalars['ID']['input'];
};

export type EventsResult = EventList | NotAuthorized;

export type Group = {
  __typename?: 'Group';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export enum Infrastructure {
  AnimalFarm = 'ANIMAL_FARM',
  Apartments = 'APARTMENTS',
  Bank = 'BANK',
  Empty = 'EMPTY',
  Garden = 'GARDEN',
  House = 'HOUSE',
  Hut = 'HUT',
  Jungle = 'JUNGLE',
  NuclearPlant = 'NUCLEAR_PLANT',
  Port = 'PORT',
  Quarry = 'QUARRY',
  Warehouse = 'WAREHOUSE',
  WheatField = 'WHEAT_FIELD',
  WindTurbine = 'WIND_TURBINE'
}

export enum InfrastructureStatus {
  Off = 'OFF',
  On = 'ON'
}

export type Inventory = {
  __typename?: 'Inventory';
  bankLevels: Scalars['Int']['output'];
  energy: Scalars['Int']['output'];
  energyFree: Scalars['Int']['output'];
  energyTotal: Scalars['Int']['output'];
  energyUsed: Scalars['Int']['output'];
  food: Scalars['Int']['output'];
  foodProduction: Scalars['Int']['output'];
  frozenFood: Scalars['Int']['output'];
  frozenFoodProduction: Scalars['Int']['output'];
  frozenFoodStorage: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  island: Island;
  lastFoodRotAt: Scalars['Time']['output'];
  material: Scalars['Int']['output'];
  materialProduction: Scalars['Int']['output'];
  owner: User;
  population: Scalars['Int']['output'];
  populationFree: Scalars['Int']['output'];
  populationTotal: Scalars['Int']['output'];
  populationUsed: Scalars['Int']['output'];
  timestamp: Scalars['Time']['output'];
};

export type InventoryResult = Inventory | NotAuthorized | NotFound;

export type Island = {
  __typename?: 'Island';
  constructionSites: Array<ConstructionSite>;
  id: Scalars['ID']['output'];
  inventory: Inventory;
  lastUpdateAt: Scalars['Time']['output'];
  name: Scalars['String']['output'];
  owner: User;
  tiles: Array<Tile>;
};

export type IslandList = {
  __typename?: 'IslandList';
  islands: Array<Island>;
};

export type IslandResult = Island | NotAuthorized | NotFound;

export type IslandSearchResult = IslandList | NotAuthorized;

export type MarketPrice = {
  __typename?: 'MarketPrice';
  commodity: CommodityType;
  commodityCurrency?: Maybe<Currency>;
  currency: Currency;
  numTrades: Scalars['Int']['output'];
  prevNumTrades: Scalars['Int']['output'];
  prevPrice: Scalars['Decimal']['output'];
  prevQuantity: Scalars['Int']['output'];
  price: Scalars['Decimal']['output'];
  quantity: Scalars['Int']['output'];
  timestamp: Scalars['Time']['output'];
};

export type MarketPrices = {
  __typename?: 'MarketPrices';
  prices: Array<MarketPrice>;
};

export type MarketPricesInput = {
  commodity: CommodityType;
  commodityCurrencyId?: InputMaybe<Scalars['String']['input']>;
  currencyId: Scalars['String']['input'];
  range: Range;
};

export type MarketPricesResult = MarketPrices | NotAuthorized;

export type MeResult = NotAuthorized | NotFound | User;

export type Mutation = {
  __typename?: 'Mutation';
  buildInfrastructure?: Maybe<BuildInfrastructureResult>;
  cancelConstruction?: Maybe<CancelConstructionResult>;
  cancelTradeOrder?: Maybe<CancelTradeOrderResult>;
  deleteEmailAddress: DeleteEmailAddressResult;
  destroyInfrastructure?: Maybe<DestroyInfrastructureResult>;
  editArticle: EditArticleResult;
  publishArticle: PublishArticleResult;
  register: RegistrationResult;
  sendTradeOrder?: Maybe<SendTradeOrderResult>;
  setEmailAddress: SetEmailAddressResult;
  setInfrastructureDesiredStatus?: Maybe<SetInfrastructureDesiredStatusResult>;
  setPassword: SetPasswordResult;
  setUsername: SetUsernameResult;
  upgradeInfrastructure?: Maybe<UpgradeInfrastructureResult>;
};


export type MutationBuildInfrastructureArgs = {
  infrastructure: Infrastructure;
  islandId: Scalars['String']['input'];
  position: Scalars['Int']['input'];
};


export type MutationCancelConstructionArgs = {
  islandId: Scalars['String']['input'];
  position: Scalars['Int']['input'];
};


export type MutationCancelTradeOrderArgs = {
  tradeOrderId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type MutationDeleteEmailAddressArgs = {
  userId: Scalars['String']['input'];
};


export type MutationDestroyInfrastructureArgs = {
  islandId: Scalars['String']['input'];
  position: Scalars['Int']['input'];
};


export type MutationEditArticleArgs = {
  input: EditArticleInput;
};


export type MutationPublishArticleArgs = {
  input: PublishArticleInput;
};


export type MutationRegisterArgs = {
  captcha: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationSendTradeOrderArgs = {
  input: SendTradeOrderInput;
};


export type MutationSetEmailAddressArgs = {
  new: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type MutationSetInfrastructureDesiredStatusArgs = {
  islandId: Scalars['String']['input'];
  position: Scalars['Int']['input'];
  status: InfrastructureStatus;
};


export type MutationSetPasswordArgs = {
  new: Scalars['String']['input'];
  old: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type MutationSetUsernameArgs = {
  new: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type MutationUpgradeInfrastructureArgs = {
  islandId: Scalars['String']['input'];
  position: Scalars['Int']['input'];
};

export type NotAuthorized = {
  __typename?: 'NotAuthorized';
  reason?: Maybe<Scalars['String']['output']>;
};

export type NotEnoughCommodity = {
  __typename?: 'NotEnoughCommodity';
  currency: Scalars['Decimal']['output'];
  frozenFood: Scalars['Int']['output'];
  material: Scalars['Int']['output'];
};

export type NotEnoughMaterial = Rejection & {
  __typename?: 'NotEnoughMaterial';
  available: Scalars['Int']['output'];
  missing: Scalars['Int']['output'];
  needed: Scalars['Int']['output'];
  reason?: Maybe<Scalars['String']['output']>;
};

export type NotFound = {
  __typename?: 'NotFound';
  identifier?: Maybe<Scalars['String']['output']>;
};

export type Player = {
  __typename?: 'Player';
  badges: Array<Badge>;
  createdAt: Scalars['Time']['output'];
  id: Scalars['ID']['output'];
  island: Island;
  name: Scalars['String']['output'];
  scoresheet: Scoresheet;
};

export type PlayerInput = {
  playerId: Scalars['ID']['input'];
};

export type PlayerResult = NotFound | Player;

export enum Precision {
  Day = 'DAY',
  Hour = 'HOUR',
  Minute = 'MINUTE',
  Second = 'SECOND'
}

export type PublishArticleInput = {
  content: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type PublishArticleResult = Article | NotAuthorized | NotFound;

export type Query = {
  __typename?: 'Query';
  apiStatus: ApiStatus;
  archipelago: Archipelago;
  article: ArticleResult;
  bankAccount: BankAccountResult;
  bankAccounts: BankAccountsResult;
  citizen: CitizenResult;
  citizensFromIsland: CitizensFromIslandResult;
  currencies: CurrenciesResult;
  currency: CurrencyResult;
  currentMarketPrices: CurrentMarketPricesResult;
  events: EventsResult;
  inventory: InventoryResult;
  island: IslandResult;
  marketPrices: MarketPricesResult;
  me: MeResult;
  myOpenTradeOrders: TradeOrdersResult;
  newSessionToken: Scalars['String']['output'];
  player: PlayerResult;
  recentArticles: RecentArticlesResult;
  searchIslands: IslandSearchResult;
  sessionToken: Scalars['String']['output'];
  tile: TileResult;
  topPlayers: TopPlayersResult;
  tradeOrders: TradeOrdersResult;
  usernameAvailability: Scalars['Boolean']['output'];
};


export type QueryArticleArgs = {
  input: ArticleInput;
};


export type QueryBankAccountArgs = {
  accountId: Scalars['String']['input'];
};


export type QueryBankAccountsArgs = {
  userId: Scalars['String']['input'];
};


export type QueryCitizenArgs = {
  input: CitizenInput;
};


export type QueryCitizensFromIslandArgs = {
  input: CitizensFromIslandInput;
};


export type QueryCurrencyArgs = {
  code: Scalars['String']['input'];
};


export type QueryCurrentMarketPricesArgs = {
  input: CurrentMarketPricesInput;
};


export type QueryEventsArgs = {
  input: EventsInput;
};


export type QueryInventoryArgs = {
  islandId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type QueryIslandArgs = {
  islandId: Scalars['String']['input'];
};


export type QueryMarketPricesArgs = {
  input: MarketPricesInput;
};


export type QueryMeArgs = {
  userId: Scalars['String']['input'];
};


export type QueryMyOpenTradeOrdersArgs = {
  userId: Scalars['String']['input'];
};


export type QueryNewSessionTokenArgs = {
  old: Scalars['String']['input'];
};


export type QueryPlayerArgs = {
  input: PlayerInput;
};


export type QueryRecentArticlesArgs = {
  input: RecentArticlesInput;
};


export type QuerySearchIslandsArgs = {
  term: Scalars['String']['input'];
};


export type QuerySessionTokenArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type QueryTileArgs = {
  islandId: Scalars['String']['input'];
  position: Scalars['Int']['input'];
};


export type QueryTopPlayersArgs = {
  input: TopPlayersInput;
};


export type QueryTradeOrdersArgs = {
  input: TradeOrdersInput;
};


export type QueryUsernameAvailabilityArgs = {
  username: Scalars['String']['input'];
};

export enum Range {
  Day_30 = 'DAY_30',
  Day_180 = 'DAY_180',
  Day_365 = 'DAY_365',
  Hour_24 = 'HOUR_24',
  Hour_168 = 'HOUR_168',
  Min_60 = 'MIN_60',
  Sec_60 = 'SEC_60',
  Sec_300 = 'SEC_300'
}

export type RecentArticlesInput = {
  limit: Scalars['Int']['input'];
};

export type RecentArticlesResult = ArticleList;

export type RegistrationResult = AlreadyExists | User;

export type Rejection = {
  reason?: Maybe<Scalars['String']['output']>;
};

export type Scoresheet = {
  __typename?: 'Scoresheet';
  buildings: Array<BuildingScore>;
  commodities: Array<CommodityScore>;
  currencies: Array<CurrencyScore>;
  id: Scalars['ID']['output'];
  player: Player;
  score: Scalars['Int']['output'];
};

export type SellTradeOrderExecution = Event & {
  __typename?: 'SellTradeOrderExecution';
  buyer: User;
  commodity: CommodityType;
  commodityCurrency?: Maybe<Currency>;
  currency: Currency;
  happenedAt: Scalars['Time']['output'];
  id: Scalars['Int']['output'];
  price: Scalars['Decimal']['output'];
  quantity: Scalars['Int']['output'];
  seller: User;
  user?: Maybe<User>;
};

export type SendTradeOrderInput = {
  commodity: CommodityType;
  commodityCurrencyId?: InputMaybe<Scalars['String']['input']>;
  currencyId: Scalars['String']['input'];
  expiresAt: Scalars['Time']['input'];
  price: Scalars['Decimal']['input'];
  quantity: Scalars['Int']['input'];
  side: TradeOrderSide;
  userId: Scalars['String']['input'];
};

export type SendTradeOrderResult = NotAuthorized | NotEnoughCommodity | TradeOrder;

export type SetEmailAddressResult = AlreadyExists | NotAuthorized | User;

export type SetInfrastructureDesiredStatusResult = NotAuthorized | NotFound | Tile;

export type SetPasswordResult = NotAuthorized | User;

export type SetUsernameResult = AlreadyExists | NotAuthorized | User;

export type Tile = {
  __typename?: 'Tile';
  blueprints: Array<Blueprint>;
  constructionSite?: Maybe<ConstructionSite>;
  currentStatus: InfrastructureStatus;
  desiredStatus: InfrastructureStatus;
  energy: Scalars['Int']['output'];
  food: Scalars['Int']['output'];
  frozenFood: Scalars['Int']['output'];
  frozenFoodStorage: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  infrastructure: Infrastructure;
  island: Island;
  kind: TileKind;
  level: Scalars['Int']['output'];
  material: Scalars['Int']['output'];
  materialProduction: Scalars['Int']['output'];
  maxLevel: Scalars['Int']['output'];
  population: Scalars['Int']['output'];
  position: Scalars['Int']['output'];
};

export enum TileKind {
  DeepWater = 'DEEP_WATER',
  Land = 'LAND',
  Sand = 'SAND',
  Water = 'WATER'
}

export type TileResult = NotAuthorized | NotFound | Tile;

export type TopPlayers = {
  __typename?: 'TopPlayers';
  players?: Maybe<Array<Player>>;
};

export type TopPlayersInput = {
  limit: Scalars['Int']['input'];
};

export type TopPlayersResult = TopPlayers;

export type TradeOrder = {
  __typename?: 'TradeOrder';
  author: User;
  commodity: CommodityType;
  commodityCurrency?: Maybe<Currency>;
  createdAt: Scalars['Time']['output'];
  currency: Currency;
  expiresAt: Scalars['Time']['output'];
  id: Scalars['ID']['output'];
  price: Scalars['Decimal']['output'];
  quantity: Scalars['Int']['output'];
  side: TradeOrderSide;
};

export type TradeOrderList = {
  __typename?: 'TradeOrderList';
  orders: Array<TradeOrder>;
};

export enum TradeOrderSide {
  Buy = 'BUY',
  Sell = 'SELL'
}

export type TradeOrdersInput = {
  commodity: CommodityType;
  commodityCurrencyId?: InputMaybe<Scalars['String']['input']>;
  currencyId: Scalars['String']['input'];
  side: TradeOrderSide;
};

export type TradeOrdersResult = NotAuthorized | TradeOrderList;

export type UpgradeInfrastructureResult = NotAuthorized | NotEnoughMaterial | NotFound | Tile;

export type User = {
  __typename?: 'User';
  createdAt: Scalars['Time']['output'];
  emailAddress?: Maybe<Scalars['String']['output']>;
  emailAddressVerified: Scalars['Boolean']['output'];
  groups: Array<Group>;
  id: Scalars['ID']['output'];
  lastActivityAt?: Maybe<Scalars['Time']['output']>;
  name: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type GetApiStatusQueryVariables = Exact<{ [key: string]: never; }>;


export type GetApiStatusQuery = { __typename?: 'Query', apiStatus: { __typename?: 'APIStatus', running: boolean } };

export type GetAllConstructionSitesQueryVariables = Exact<{
  islandId: Scalars['String']['input'];
}>;


export type GetAllConstructionSitesQuery = { __typename?: 'Query', island: { __typename?: 'Island', id: string, constructionSites: Array<{ __typename?: 'ConstructionSite', id: string, infrastructure: Infrastructure, workloadLeft: number, finishedAt: any, tile: { __typename?: 'Tile', position: number, level: number } }> } | { __typename?: 'NotAuthorized' } | { __typename?: 'NotFound' } };

export type GetTileStatusQueryVariables = Exact<{
  islandId: Scalars['String']['input'];
  position: Scalars['Int']['input'];
}>;


export type GetTileStatusQuery = { __typename?: 'Query', tile: { __typename?: 'NotAuthorized' } | { __typename?: 'NotFound' } | { __typename?: 'Tile', id: string, desiredStatus: InfrastructureStatus } };

export type SetInfrastructureDesiredStatusMutationVariables = Exact<{
  islandId: Scalars['String']['input'];
  position: Scalars['Int']['input'];
  status: InfrastructureStatus;
}>;


export type SetInfrastructureDesiredStatusMutation = { __typename?: 'Mutation', setInfrastructureDesiredStatus?: { __typename?: 'NotAuthorized' } | { __typename?: 'NotFound' } | { __typename?: 'Tile', id: string, desiredStatus: InfrastructureStatus, currentStatus: InfrastructureStatus, population: number, material: number, energy: number, island: { __typename?: 'Island', id: string, inventory: { __typename?: 'Inventory', id: string, populationUsed: number, populationFree: number, populationTotal: number, energyUsed: number, energyFree: number, energyTotal: number, materialProduction: number, timestamp: any }, tiles: Array<{ __typename?: 'Tile', id: string, currentStatus: InfrastructureStatus }> } } | null };

export type GetUsernameAvailabilityQueryVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type GetUsernameAvailabilityQuery = { __typename?: 'Query', usernameAvailability: boolean };

export type GetBankAccountsQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type GetBankAccountsQuery = { __typename?: 'Query', bankAccounts: { __typename: 'BankAccountList', bankAccounts: Array<{ __typename?: 'BankAccount', id: string, amount: any, currency: { __typename?: 'Currency', id: string, code: string, name: string } }> } | { __typename: 'NotAuthorized' } };

export type GetCurrentInventoryQueryVariables = Exact<{
  islandId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
}>;


export type GetCurrentInventoryQuery = { __typename?: 'Query', inventory: { __typename?: 'Inventory', id: string, populationUsed: number, populationFree: number, populationTotal: number, energyUsed: number, energyFree: number, energyTotal: number, materialProduction: number, material: number, foodProduction: number, food: number, frozenFoodProduction: number, frozenFood: number, frozenFoodStorage: number, bankLevels: number, timestamp: any, island: { __typename?: 'Island', lastUpdateAt: any } } | { __typename?: 'NotAuthorized' } | { __typename?: 'NotFound' } };

export type LoginQueryVariables = Exact<{
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginQuery = { __typename?: 'Query', sessionToken: string };

export type RefreshTokenQueryVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type RefreshTokenQuery = { __typename?: 'Query', newSessionToken: string };

export type RegisterMutationVariables = Exact<{
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
  captcha: Scalars['String']['input'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename: 'AlreadyExists', identifier?: string | null } | { __typename: 'User', id: string, username: string } };

export type SetUsernameMutationVariables = Exact<{
  userId: Scalars['String']['input'];
  username: Scalars['String']['input'];
}>;


export type SetUsernameMutation = { __typename?: 'Mutation', setUsername: { __typename: 'AlreadyExists' } | { __typename: 'NotAuthorized' } | { __typename: 'User' } };

export type GetEmailAddressQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type GetEmailAddressQuery = { __typename?: 'Query', me: { __typename: 'NotAuthorized' } | { __typename: 'NotFound' } | { __typename: 'User', id: string, emailAddress?: string | null, emailAddressVerified: boolean } };

export type SetEmailAddressMutationVariables = Exact<{
  userId: Scalars['String']['input'];
  emailAddress: Scalars['String']['input'];
}>;


export type SetEmailAddressMutation = { __typename?: 'Mutation', setEmailAddress: { __typename: 'AlreadyExists' } | { __typename: 'NotAuthorized' } | { __typename: 'User', id: string, emailAddress?: string | null, emailAddressVerified: boolean } };

export type DeleteEmailAddressMutationVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type DeleteEmailAddressMutation = { __typename?: 'Mutation', deleteEmailAddress: { __typename: 'NotAuthorized' } | { __typename: 'User', id: string, emailAddress?: string | null } };

export type SetPasswordMutationVariables = Exact<{
  userId: Scalars['String']['input'];
  old: Scalars['String']['input'];
  new: Scalars['String']['input'];
}>;


export type SetPasswordMutation = { __typename?: 'Mutation', setPassword: { __typename: 'NotAuthorized' } | { __typename: 'User' } };

export type GetNumberIslandsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetNumberIslandsQuery = { __typename?: 'Query', archipelago: { __typename?: 'Archipelago', id: string, numberIslands: number } };

export type GetTopPlayersQueryVariables = Exact<{
  input: TopPlayersInput;
}>;


export type GetTopPlayersQuery = { __typename?: 'Query', topPlayers: { __typename?: 'TopPlayers', players?: Array<{ __typename?: 'Player', id: string, name: string, scoresheet: { __typename?: 'Scoresheet', id: string, score: number } }> | null } };

export type SearchIslandsQueryVariables = Exact<{
  term: Scalars['String']['input'];
}>;


export type SearchIslandsQuery = { __typename?: 'Query', searchIslands: { __typename?: 'IslandList', islands: Array<{ __typename?: 'Island', id: string, name: string }> } | { __typename?: 'NotAuthorized' } };

export type GetCitizenQueryVariables = Exact<{
  input: CitizenInput;
}>;


export type GetCitizenQuery = { __typename?: 'Query', citizen: { __typename: 'Citizen', id: string, name: string, createdAt: any } | { __typename: 'NotFound' } };

export type GetCitizensQueryVariables = Exact<{
  input: CitizensFromIslandInput;
}>;


export type GetCitizensQuery = { __typename?: 'Query', citizensFromIsland: { __typename?: 'CitizenList', citizens: Array<{ __typename?: 'Citizen', id: string, createdAt: any, name: string }> } | { __typename?: 'NotFound' } };

export type GetEventsQueryVariables = Exact<{
  input: EventsInput;
}>;


export type GetEventsQuery = { __typename?: 'Query', events: { __typename?: 'EventList', events: Array<{ __typename: 'AccountCreation', id: number, happenedAt: any } | { __typename: 'BuyTradeOrderExecution', id: number, happenedAt: any, commodity: CommodityType, quantity: number, price: any, currency: { __typename?: 'Currency', code: string }, commodityCurrency?: { __typename?: 'Currency', code: string } | null } | { __typename: 'SellTradeOrderExecution', id: number, happenedAt: any, commodity: CommodityType, quantity: number, price: any, currency: { __typename?: 'Currency', code: string }, commodityCurrency?: { __typename?: 'Currency', code: string } | null }> } | { __typename?: 'NotAuthorized' } };

export type GetTilesQueryVariables = Exact<{
  islandId: Scalars['String']['input'];
}>;


export type GetTilesQuery = { __typename?: 'Query', island: { __typename?: 'Island', id: string, tiles: Array<{ __typename?: 'Tile', id: string, position: number, kind: TileKind, infrastructure: Infrastructure, level: number, desiredStatus: InfrastructureStatus, currentStatus: InfrastructureStatus, population: number, material: number, food: number, frozenFood: number, energy: number, island: { __typename?: 'Island', id: string } }> } | { __typename?: 'NotAuthorized' } | { __typename?: 'NotFound' } };

export type GetIslandQueryVariables = Exact<{
  islandId: Scalars['String']['input'];
}>;


export type GetIslandQuery = { __typename?: 'Query', island: { __typename?: 'Island', id: string, owner: { __typename?: 'User', id: string, username: string }, tiles: Array<{ __typename?: 'Tile', id: string, position: number, infrastructure: Infrastructure, level: number }> } | { __typename?: 'NotAuthorized' } | { __typename?: 'NotFound' } };

export type GetIslandOverviewQueryVariables = Exact<{
  islandId: Scalars['String']['input'];
}>;


export type GetIslandOverviewQuery = { __typename?: 'Query', island: { __typename?: 'Island', id: string, name: string, owner: { __typename?: 'User', id: string, name: string } } | { __typename?: 'NotAuthorized' } | { __typename?: 'NotFound' } };

export type GetPlayerProfileQueryVariables = Exact<{
  input: PlayerInput;
}>;


export type GetPlayerProfileQuery = { __typename?: 'Query', player: { __typename?: 'NotFound' } | { __typename?: 'Player', scoresheet: { __typename?: 'Scoresheet', id: string, score: number, commodities: Array<{ __typename?: 'CommodityScore', commodity: CommodityType, score: number }>, buildings: Array<{ __typename?: 'BuildingScore', score: number }>, currencies: Array<{ __typename?: 'CurrencyScore', score: number, currency: { __typename?: 'Currency', id: string } }> }, badges: Array<{ __typename?: 'Badge', id: string, createdAt: any, type: BadgeType }> } };

export type GetTileQueryVariables = Exact<{
  islandId: Scalars['String']['input'];
  position: Scalars['Int']['input'];
}>;


export type GetTileQuery = { __typename?: 'Query', tile: { __typename?: 'NotAuthorized' } | { __typename?: 'NotFound' } | { __typename?: 'Tile', id: string, position: number, kind: TileKind, infrastructure: Infrastructure, level: number, maxLevel: number, desiredStatus: InfrastructureStatus, currentStatus: InfrastructureStatus, population: number, energy: number, material: number, food: number, frozenFood: number, frozenFoodStorage: number, constructionSite?: { __typename?: 'ConstructionSite', id: string, infrastructure: Infrastructure, workloadLeft: number, finishedAt: any } | null, blueprints: Array<{ __typename?: 'Blueprint', infrastructure: Infrastructure, materialCost: number, workload: number }> } };

export type BuildInfrastructureMutationVariables = Exact<{
  islandId: Scalars['String']['input'];
  position: Scalars['Int']['input'];
  infrastructure: Infrastructure;
}>;


export type BuildInfrastructureMutation = { __typename?: 'Mutation', buildInfrastructure?: { __typename?: 'NotAuthorized' } | { __typename?: 'NotEnoughMaterial' } | { __typename?: 'NotFound' } | { __typename?: 'Tile', id: string, infrastructure: Infrastructure, level: number, constructionSite?: { __typename?: 'ConstructionSite', id: string, infrastructure: Infrastructure, workloadLeft: number, finishedAt: any, tile: { __typename?: 'Tile', position: number } } | null, blueprints: Array<{ __typename?: 'Blueprint', infrastructure: Infrastructure, materialCost: number, workload: number }>, island: { __typename?: 'Island', id: string, inventory: { __typename?: 'Inventory', id: string, material: number } } } | null };

export type NewConstructionSiteFragment = { __typename?: 'ConstructionSite', id: string, infrastructure: Infrastructure, workloadLeft: number, finishedAt: any, tile: { __typename?: 'Tile', position: number } };

export type CancelConstructionMutationVariables = Exact<{
  islandId: Scalars['String']['input'];
  position: Scalars['Int']['input'];
}>;


export type CancelConstructionMutation = { __typename?: 'Mutation', cancelConstruction?: { __typename?: 'NotAuthorized' } | { __typename?: 'NotFound' } | { __typename?: 'Tile', id: string, position: number, infrastructure: Infrastructure, level: number, constructionSite?: { __typename?: 'ConstructionSite', id: string } | null, blueprints: Array<{ __typename?: 'Blueprint', infrastructure: Infrastructure, materialCost: number, workload: number }>, island: { __typename?: 'Island', id: string, inventory: { __typename?: 'Inventory', id: string, material: number } } } | null };

export type UpgradeInfrastructureMutationVariables = Exact<{
  islandId: Scalars['String']['input'];
  position: Scalars['Int']['input'];
}>;


export type UpgradeInfrastructureMutation = { __typename?: 'Mutation', upgradeInfrastructure?: { __typename?: 'NotAuthorized' } | { __typename?: 'NotEnoughMaterial' } | { __typename?: 'NotFound' } | { __typename?: 'Tile', id: string, infrastructure: Infrastructure, level: number, constructionSite?: { __typename?: 'ConstructionSite', id: string, infrastructure: Infrastructure, workloadLeft: number, finishedAt: any, tile: { __typename?: 'Tile', position: number } } | null, blueprints: Array<{ __typename?: 'Blueprint', infrastructure: Infrastructure, materialCost: number, workload: number }>, island: { __typename?: 'Island', id: string, inventory: { __typename?: 'Inventory', id: string, material: number } } } | null };

export type DestroyInfrastructureMutationVariables = Exact<{
  islandId: Scalars['String']['input'];
  position: Scalars['Int']['input'];
}>;


export type DestroyInfrastructureMutation = { __typename?: 'Mutation', destroyInfrastructure?: { __typename?: 'NotAuthorized' } | { __typename?: 'Tile', id: string, infrastructure: Infrastructure, level: number, constructionSite?: { __typename?: 'ConstructionSite', finishedAt: any } | null, blueprints: Array<{ __typename?: 'Blueprint', infrastructure: Infrastructure, materialCost: number, workload: number }> } | null };

export type GetBankLevelsQueryVariables = Exact<{
  userId: Scalars['String']['input'];
  islandId: Scalars['String']['input'];
}>;


export type GetBankLevelsQuery = { __typename?: 'Query', inventory: { __typename: 'Inventory', id: string, bankLevels: number } | { __typename: 'NotAuthorized' } | { __typename: 'NotFound' } };

export type GetMarketPricesQueryVariables = Exact<{
  input: MarketPricesInput;
}>;


export type GetMarketPricesQuery = { __typename?: 'Query', marketPrices: { __typename: 'MarketPrices', prices: Array<{ __typename?: 'MarketPrice', timestamp: any, commodity: CommodityType, numTrades: number, quantity: number, price: any, prevNumTrades: number, prevQuantity: number, prevPrice: any, currency: { __typename?: 'Currency', id: string } }> } | { __typename: 'NotAuthorized' } };

export type GetCurrentMarketPricesQueryVariables = Exact<{
  input: CurrentMarketPricesInput;
}>;


export type GetCurrentMarketPricesQuery = { __typename?: 'Query', currentMarketPrices: { __typename?: 'CurrentMarketPrices', commodityPrices: Array<{ __typename?: 'CommodityPrice', commodity: CommodityType, price: any }>, currencyPrices: Array<{ __typename?: 'CurrencyPrice', price: any, currency: { __typename?: 'Currency', id: string, code: string, name: string } }> } | { __typename?: 'NotFound' } };

export type SendTradeOrderMutationVariables = Exact<{
  input: SendTradeOrderInput;
}>;


export type SendTradeOrderMutation = { __typename?: 'Mutation', sendTradeOrder?: { __typename: 'NotAuthorized' } | { __typename: 'NotEnoughCommodity' } | { __typename: 'TradeOrder', id: string, createdAt: any, expiresAt: any, side: TradeOrderSide, commodity: CommodityType, quantity: number, price: any, currency: { __typename?: 'Currency', id: string, code: string, name: string } } | null };

export type NewOrderFragment = { __typename?: 'TradeOrder', id: string, createdAt: any, expiresAt: any, side: TradeOrderSide, commodity: CommodityType, quantity: number, price: any, currency: { __typename?: 'Currency', id: string, code: string, name: string } };

export type GetMyOpenOrdersQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type GetMyOpenOrdersQuery = { __typename?: 'Query', myOpenTradeOrders: { __typename: 'NotAuthorized' } | { __typename: 'TradeOrderList', orders: Array<{ __typename?: 'TradeOrder', id: string, side: TradeOrderSide, expiresAt: any, commodity: CommodityType, quantity: number, price: any, currency: { __typename?: 'Currency', id: string, code: string } }> } };

export type GetPublicPlayerProfileQueryVariables = Exact<{
  input: PlayerInput;
}>;


export type GetPublicPlayerProfileQuery = { __typename?: 'Query', player: { __typename?: 'NotFound' } | { __typename?: 'Player', id: string, name: string, island: { __typename?: 'Island', name: string, tiles: Array<{ __typename?: 'Tile', id: string, position: number, infrastructure: Infrastructure, level: number }> }, scoresheet: { __typename?: 'Scoresheet', id: string, score: number, commodities: Array<{ __typename?: 'CommodityScore', commodity: CommodityType, score: number }>, buildings: Array<{ __typename?: 'BuildingScore', score: number }>, currencies: Array<{ __typename?: 'CurrencyScore', score: number, currency: { __typename?: 'Currency', id: string } }> }, badges: Array<{ __typename?: 'Badge', id: string, createdAt: any, type: BadgeType }> } };

export const NewConstructionSiteFragmentDoc = gql`
    fragment NewConstructionSite on ConstructionSite {
  id
  infrastructure
  workloadLeft
  finishedAt
  tile {
    position
  }
}
    `;
export const NewOrderFragmentDoc = gql`
    fragment NewOrder on TradeOrder {
  id
  createdAt
  expiresAt
  side
  currency {
    id
    code
    name
  }
  commodity
  quantity
  price
}
    `;
export const GetApiStatusDocument = gql`
    query GetAPIStatus {
  apiStatus {
    running
  }
}
    `;

/**
 * __useGetApiStatusQuery__
 *
 * To run a query within a React component, call `useGetApiStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetApiStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetApiStatusQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetApiStatusQuery(baseOptions?: Apollo.QueryHookOptions<GetApiStatusQuery, GetApiStatusQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetApiStatusQuery, GetApiStatusQueryVariables>(GetApiStatusDocument, options);
      }
export function useGetApiStatusLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetApiStatusQuery, GetApiStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetApiStatusQuery, GetApiStatusQueryVariables>(GetApiStatusDocument, options);
        }
export function useGetApiStatusSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetApiStatusQuery, GetApiStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetApiStatusQuery, GetApiStatusQueryVariables>(GetApiStatusDocument, options);
        }
export type GetApiStatusQueryHookResult = ReturnType<typeof useGetApiStatusQuery>;
export type GetApiStatusLazyQueryHookResult = ReturnType<typeof useGetApiStatusLazyQuery>;
export type GetApiStatusSuspenseQueryHookResult = ReturnType<typeof useGetApiStatusSuspenseQuery>;
export type GetApiStatusQueryResult = Apollo.QueryResult<GetApiStatusQuery, GetApiStatusQueryVariables>;
export const GetAllConstructionSitesDocument = gql`
    query GetAllConstructionSites($islandId: String!) {
  island(islandId: $islandId) {
    ... on Island {
      id
      constructionSites {
        id
        infrastructure
        workloadLeft
        finishedAt
        tile {
          position
          level
        }
      }
    }
  }
}
    `;

/**
 * __useGetAllConstructionSitesQuery__
 *
 * To run a query within a React component, call `useGetAllConstructionSitesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllConstructionSitesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllConstructionSitesQuery({
 *   variables: {
 *      islandId: // value for 'islandId'
 *   },
 * });
 */
export function useGetAllConstructionSitesQuery(baseOptions: Apollo.QueryHookOptions<GetAllConstructionSitesQuery, GetAllConstructionSitesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllConstructionSitesQuery, GetAllConstructionSitesQueryVariables>(GetAllConstructionSitesDocument, options);
      }
export function useGetAllConstructionSitesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllConstructionSitesQuery, GetAllConstructionSitesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllConstructionSitesQuery, GetAllConstructionSitesQueryVariables>(GetAllConstructionSitesDocument, options);
        }
export function useGetAllConstructionSitesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAllConstructionSitesQuery, GetAllConstructionSitesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllConstructionSitesQuery, GetAllConstructionSitesQueryVariables>(GetAllConstructionSitesDocument, options);
        }
export type GetAllConstructionSitesQueryHookResult = ReturnType<typeof useGetAllConstructionSitesQuery>;
export type GetAllConstructionSitesLazyQueryHookResult = ReturnType<typeof useGetAllConstructionSitesLazyQuery>;
export type GetAllConstructionSitesSuspenseQueryHookResult = ReturnType<typeof useGetAllConstructionSitesSuspenseQuery>;
export type GetAllConstructionSitesQueryResult = Apollo.QueryResult<GetAllConstructionSitesQuery, GetAllConstructionSitesQueryVariables>;
export const GetTileStatusDocument = gql`
    query GetTileStatus($islandId: String!, $position: Int!) {
  tile(islandId: $islandId, position: $position) {
    ... on Tile {
      id
      desiredStatus
    }
  }
}
    `;

/**
 * __useGetTileStatusQuery__
 *
 * To run a query within a React component, call `useGetTileStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTileStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTileStatusQuery({
 *   variables: {
 *      islandId: // value for 'islandId'
 *      position: // value for 'position'
 *   },
 * });
 */
export function useGetTileStatusQuery(baseOptions: Apollo.QueryHookOptions<GetTileStatusQuery, GetTileStatusQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTileStatusQuery, GetTileStatusQueryVariables>(GetTileStatusDocument, options);
      }
export function useGetTileStatusLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTileStatusQuery, GetTileStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTileStatusQuery, GetTileStatusQueryVariables>(GetTileStatusDocument, options);
        }
export function useGetTileStatusSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetTileStatusQuery, GetTileStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTileStatusQuery, GetTileStatusQueryVariables>(GetTileStatusDocument, options);
        }
export type GetTileStatusQueryHookResult = ReturnType<typeof useGetTileStatusQuery>;
export type GetTileStatusLazyQueryHookResult = ReturnType<typeof useGetTileStatusLazyQuery>;
export type GetTileStatusSuspenseQueryHookResult = ReturnType<typeof useGetTileStatusSuspenseQuery>;
export type GetTileStatusQueryResult = Apollo.QueryResult<GetTileStatusQuery, GetTileStatusQueryVariables>;
export const SetInfrastructureDesiredStatusDocument = gql`
    mutation SetInfrastructureDesiredStatus($islandId: String!, $position: Int!, $status: InfrastructureStatus!) {
  setInfrastructureDesiredStatus(
    islandId: $islandId
    position: $position
    status: $status
  ) {
    ... on Tile {
      id
      desiredStatus
      currentStatus
      population
      material
      energy
      island {
        id
        inventory {
          id
          populationUsed
          populationFree
          populationTotal
          energyUsed
          energyFree
          energyTotal
          materialProduction
          timestamp
        }
        tiles {
          id
          currentStatus
        }
      }
    }
  }
}
    `;
export type SetInfrastructureDesiredStatusMutationFn = Apollo.MutationFunction<SetInfrastructureDesiredStatusMutation, SetInfrastructureDesiredStatusMutationVariables>;

/**
 * __useSetInfrastructureDesiredStatusMutation__
 *
 * To run a mutation, you first call `useSetInfrastructureDesiredStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetInfrastructureDesiredStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setInfrastructureDesiredStatusMutation, { data, loading, error }] = useSetInfrastructureDesiredStatusMutation({
 *   variables: {
 *      islandId: // value for 'islandId'
 *      position: // value for 'position'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useSetInfrastructureDesiredStatusMutation(baseOptions?: Apollo.MutationHookOptions<SetInfrastructureDesiredStatusMutation, SetInfrastructureDesiredStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetInfrastructureDesiredStatusMutation, SetInfrastructureDesiredStatusMutationVariables>(SetInfrastructureDesiredStatusDocument, options);
      }
export type SetInfrastructureDesiredStatusMutationHookResult = ReturnType<typeof useSetInfrastructureDesiredStatusMutation>;
export type SetInfrastructureDesiredStatusMutationResult = Apollo.MutationResult<SetInfrastructureDesiredStatusMutation>;
export type SetInfrastructureDesiredStatusMutationOptions = Apollo.BaseMutationOptions<SetInfrastructureDesiredStatusMutation, SetInfrastructureDesiredStatusMutationVariables>;
export const GetUsernameAvailabilityDocument = gql`
    query GetUsernameAvailability($username: String!) {
  usernameAvailability(username: $username)
}
    `;

/**
 * __useGetUsernameAvailabilityQuery__
 *
 * To run a query within a React component, call `useGetUsernameAvailabilityQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsernameAvailabilityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsernameAvailabilityQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useGetUsernameAvailabilityQuery(baseOptions: Apollo.QueryHookOptions<GetUsernameAvailabilityQuery, GetUsernameAvailabilityQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsernameAvailabilityQuery, GetUsernameAvailabilityQueryVariables>(GetUsernameAvailabilityDocument, options);
      }
export function useGetUsernameAvailabilityLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsernameAvailabilityQuery, GetUsernameAvailabilityQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsernameAvailabilityQuery, GetUsernameAvailabilityQueryVariables>(GetUsernameAvailabilityDocument, options);
        }
export function useGetUsernameAvailabilitySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetUsernameAvailabilityQuery, GetUsernameAvailabilityQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUsernameAvailabilityQuery, GetUsernameAvailabilityQueryVariables>(GetUsernameAvailabilityDocument, options);
        }
export type GetUsernameAvailabilityQueryHookResult = ReturnType<typeof useGetUsernameAvailabilityQuery>;
export type GetUsernameAvailabilityLazyQueryHookResult = ReturnType<typeof useGetUsernameAvailabilityLazyQuery>;
export type GetUsernameAvailabilitySuspenseQueryHookResult = ReturnType<typeof useGetUsernameAvailabilitySuspenseQuery>;
export type GetUsernameAvailabilityQueryResult = Apollo.QueryResult<GetUsernameAvailabilityQuery, GetUsernameAvailabilityQueryVariables>;
export const GetBankAccountsDocument = gql`
    query GetBankAccounts($userId: String!) {
  bankAccounts(userId: $userId) {
    __typename
    ... on BankAccountList {
      bankAccounts {
        id
        amount
        currency {
          id
          code
          name
        }
      }
    }
  }
}
    `;

/**
 * __useGetBankAccountsQuery__
 *
 * To run a query within a React component, call `useGetBankAccountsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBankAccountsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBankAccountsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetBankAccountsQuery(baseOptions: Apollo.QueryHookOptions<GetBankAccountsQuery, GetBankAccountsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBankAccountsQuery, GetBankAccountsQueryVariables>(GetBankAccountsDocument, options);
      }
export function useGetBankAccountsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBankAccountsQuery, GetBankAccountsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBankAccountsQuery, GetBankAccountsQueryVariables>(GetBankAccountsDocument, options);
        }
export function useGetBankAccountsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetBankAccountsQuery, GetBankAccountsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetBankAccountsQuery, GetBankAccountsQueryVariables>(GetBankAccountsDocument, options);
        }
export type GetBankAccountsQueryHookResult = ReturnType<typeof useGetBankAccountsQuery>;
export type GetBankAccountsLazyQueryHookResult = ReturnType<typeof useGetBankAccountsLazyQuery>;
export type GetBankAccountsSuspenseQueryHookResult = ReturnType<typeof useGetBankAccountsSuspenseQuery>;
export type GetBankAccountsQueryResult = Apollo.QueryResult<GetBankAccountsQuery, GetBankAccountsQueryVariables>;
export const GetCurrentInventoryDocument = gql`
    query GetCurrentInventory($islandId: String!, $userId: String!) {
  inventory(islandId: $islandId, userId: $userId) {
    ... on Inventory {
      id
      populationUsed
      populationFree
      populationTotal
      energyUsed
      energyFree
      energyTotal
      materialProduction
      material
      foodProduction
      food
      frozenFoodProduction
      frozenFood
      frozenFoodStorage
      bankLevels
      timestamp
      island {
        lastUpdateAt
      }
    }
  }
}
    `;

/**
 * __useGetCurrentInventoryQuery__
 *
 * To run a query within a React component, call `useGetCurrentInventoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentInventoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentInventoryQuery({
 *   variables: {
 *      islandId: // value for 'islandId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetCurrentInventoryQuery(baseOptions: Apollo.QueryHookOptions<GetCurrentInventoryQuery, GetCurrentInventoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCurrentInventoryQuery, GetCurrentInventoryQueryVariables>(GetCurrentInventoryDocument, options);
      }
export function useGetCurrentInventoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCurrentInventoryQuery, GetCurrentInventoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCurrentInventoryQuery, GetCurrentInventoryQueryVariables>(GetCurrentInventoryDocument, options);
        }
export function useGetCurrentInventorySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetCurrentInventoryQuery, GetCurrentInventoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCurrentInventoryQuery, GetCurrentInventoryQueryVariables>(GetCurrentInventoryDocument, options);
        }
export type GetCurrentInventoryQueryHookResult = ReturnType<typeof useGetCurrentInventoryQuery>;
export type GetCurrentInventoryLazyQueryHookResult = ReturnType<typeof useGetCurrentInventoryLazyQuery>;
export type GetCurrentInventorySuspenseQueryHookResult = ReturnType<typeof useGetCurrentInventorySuspenseQuery>;
export type GetCurrentInventoryQueryResult = Apollo.QueryResult<GetCurrentInventoryQuery, GetCurrentInventoryQueryVariables>;
export const LoginDocument = gql`
    query Login($username: String!, $password: String!) {
  sessionToken(username: $username, password: $password)
}
    `;

/**
 * __useLoginQuery__
 *
 * To run a query within a React component, call `useLoginQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoginQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoginQuery({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginQuery(baseOptions: Apollo.QueryHookOptions<LoginQuery, LoginQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
      }
export function useLoginLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LoginQuery, LoginQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
        }
export function useLoginSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<LoginQuery, LoginQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
        }
export type LoginQueryHookResult = ReturnType<typeof useLoginQuery>;
export type LoginLazyQueryHookResult = ReturnType<typeof useLoginLazyQuery>;
export type LoginSuspenseQueryHookResult = ReturnType<typeof useLoginSuspenseQuery>;
export type LoginQueryResult = Apollo.QueryResult<LoginQuery, LoginQueryVariables>;
export const RefreshTokenDocument = gql`
    query RefreshToken($token: String!) {
  newSessionToken(old: $token)
}
    `;

/**
 * __useRefreshTokenQuery__
 *
 * To run a query within a React component, call `useRefreshTokenQuery` and pass it any options that fit your needs.
 * When your component renders, `useRefreshTokenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRefreshTokenQuery({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useRefreshTokenQuery(baseOptions: Apollo.QueryHookOptions<RefreshTokenQuery, RefreshTokenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RefreshTokenQuery, RefreshTokenQueryVariables>(RefreshTokenDocument, options);
      }
export function useRefreshTokenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RefreshTokenQuery, RefreshTokenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RefreshTokenQuery, RefreshTokenQueryVariables>(RefreshTokenDocument, options);
        }
export function useRefreshTokenSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<RefreshTokenQuery, RefreshTokenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<RefreshTokenQuery, RefreshTokenQueryVariables>(RefreshTokenDocument, options);
        }
export type RefreshTokenQueryHookResult = ReturnType<typeof useRefreshTokenQuery>;
export type RefreshTokenLazyQueryHookResult = ReturnType<typeof useRefreshTokenLazyQuery>;
export type RefreshTokenSuspenseQueryHookResult = ReturnType<typeof useRefreshTokenSuspenseQuery>;
export type RefreshTokenQueryResult = Apollo.QueryResult<RefreshTokenQuery, RefreshTokenQueryVariables>;
export const RegisterDocument = gql`
    mutation Register($username: String!, $password: String!, $captcha: String!) {
  register(username: $username, password: $password, captcha: $captcha) {
    __typename
    ... on User {
      id
      username
    }
    ... on AlreadyExists {
      identifier
    }
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *      captcha: // value for 'captcha'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const SetUsernameDocument = gql`
    mutation SetUsername($userId: String!, $username: String!) {
  setUsername(userId: $userId, new: $username) {
    __typename
  }
}
    `;
export type SetUsernameMutationFn = Apollo.MutationFunction<SetUsernameMutation, SetUsernameMutationVariables>;

/**
 * __useSetUsernameMutation__
 *
 * To run a mutation, you first call `useSetUsernameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetUsernameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setUsernameMutation, { data, loading, error }] = useSetUsernameMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      username: // value for 'username'
 *   },
 * });
 */
export function useSetUsernameMutation(baseOptions?: Apollo.MutationHookOptions<SetUsernameMutation, SetUsernameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetUsernameMutation, SetUsernameMutationVariables>(SetUsernameDocument, options);
      }
export type SetUsernameMutationHookResult = ReturnType<typeof useSetUsernameMutation>;
export type SetUsernameMutationResult = Apollo.MutationResult<SetUsernameMutation>;
export type SetUsernameMutationOptions = Apollo.BaseMutationOptions<SetUsernameMutation, SetUsernameMutationVariables>;
export const GetEmailAddressDocument = gql`
    query GetEmailAddress($userId: String!) {
  me(userId: $userId) {
    __typename
    ... on User {
      id
      emailAddress
      emailAddressVerified
    }
  }
}
    `;

/**
 * __useGetEmailAddressQuery__
 *
 * To run a query within a React component, call `useGetEmailAddressQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEmailAddressQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEmailAddressQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetEmailAddressQuery(baseOptions: Apollo.QueryHookOptions<GetEmailAddressQuery, GetEmailAddressQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEmailAddressQuery, GetEmailAddressQueryVariables>(GetEmailAddressDocument, options);
      }
export function useGetEmailAddressLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEmailAddressQuery, GetEmailAddressQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEmailAddressQuery, GetEmailAddressQueryVariables>(GetEmailAddressDocument, options);
        }
export function useGetEmailAddressSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetEmailAddressQuery, GetEmailAddressQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetEmailAddressQuery, GetEmailAddressQueryVariables>(GetEmailAddressDocument, options);
        }
export type GetEmailAddressQueryHookResult = ReturnType<typeof useGetEmailAddressQuery>;
export type GetEmailAddressLazyQueryHookResult = ReturnType<typeof useGetEmailAddressLazyQuery>;
export type GetEmailAddressSuspenseQueryHookResult = ReturnType<typeof useGetEmailAddressSuspenseQuery>;
export type GetEmailAddressQueryResult = Apollo.QueryResult<GetEmailAddressQuery, GetEmailAddressQueryVariables>;
export const SetEmailAddressDocument = gql`
    mutation SetEmailAddress($userId: String!, $emailAddress: String!) {
  setEmailAddress(userId: $userId, new: $emailAddress) {
    __typename
    ... on User {
      id
      emailAddress
      emailAddressVerified
    }
  }
}
    `;
export type SetEmailAddressMutationFn = Apollo.MutationFunction<SetEmailAddressMutation, SetEmailAddressMutationVariables>;

/**
 * __useSetEmailAddressMutation__
 *
 * To run a mutation, you first call `useSetEmailAddressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetEmailAddressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setEmailAddressMutation, { data, loading, error }] = useSetEmailAddressMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      emailAddress: // value for 'emailAddress'
 *   },
 * });
 */
export function useSetEmailAddressMutation(baseOptions?: Apollo.MutationHookOptions<SetEmailAddressMutation, SetEmailAddressMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetEmailAddressMutation, SetEmailAddressMutationVariables>(SetEmailAddressDocument, options);
      }
export type SetEmailAddressMutationHookResult = ReturnType<typeof useSetEmailAddressMutation>;
export type SetEmailAddressMutationResult = Apollo.MutationResult<SetEmailAddressMutation>;
export type SetEmailAddressMutationOptions = Apollo.BaseMutationOptions<SetEmailAddressMutation, SetEmailAddressMutationVariables>;
export const DeleteEmailAddressDocument = gql`
    mutation DeleteEmailAddress($userId: String!) {
  deleteEmailAddress(userId: $userId) {
    __typename
    ... on User {
      id
      emailAddress
    }
  }
}
    `;
export type DeleteEmailAddressMutationFn = Apollo.MutationFunction<DeleteEmailAddressMutation, DeleteEmailAddressMutationVariables>;

/**
 * __useDeleteEmailAddressMutation__
 *
 * To run a mutation, you first call `useDeleteEmailAddressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteEmailAddressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteEmailAddressMutation, { data, loading, error }] = useDeleteEmailAddressMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useDeleteEmailAddressMutation(baseOptions?: Apollo.MutationHookOptions<DeleteEmailAddressMutation, DeleteEmailAddressMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteEmailAddressMutation, DeleteEmailAddressMutationVariables>(DeleteEmailAddressDocument, options);
      }
export type DeleteEmailAddressMutationHookResult = ReturnType<typeof useDeleteEmailAddressMutation>;
export type DeleteEmailAddressMutationResult = Apollo.MutationResult<DeleteEmailAddressMutation>;
export type DeleteEmailAddressMutationOptions = Apollo.BaseMutationOptions<DeleteEmailAddressMutation, DeleteEmailAddressMutationVariables>;
export const SetPasswordDocument = gql`
    mutation SetPassword($userId: String!, $old: String!, $new: String!) {
  setPassword(userId: $userId, old: $old, new: $new) {
    __typename
  }
}
    `;
export type SetPasswordMutationFn = Apollo.MutationFunction<SetPasswordMutation, SetPasswordMutationVariables>;

/**
 * __useSetPasswordMutation__
 *
 * To run a mutation, you first call `useSetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setPasswordMutation, { data, loading, error }] = useSetPasswordMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      old: // value for 'old'
 *      new: // value for 'new'
 *   },
 * });
 */
export function useSetPasswordMutation(baseOptions?: Apollo.MutationHookOptions<SetPasswordMutation, SetPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetPasswordMutation, SetPasswordMutationVariables>(SetPasswordDocument, options);
      }
export type SetPasswordMutationHookResult = ReturnType<typeof useSetPasswordMutation>;
export type SetPasswordMutationResult = Apollo.MutationResult<SetPasswordMutation>;
export type SetPasswordMutationOptions = Apollo.BaseMutationOptions<SetPasswordMutation, SetPasswordMutationVariables>;
export const GetNumberIslandsDocument = gql`
    query GetNumberIslands {
  archipelago {
    id
    numberIslands
  }
}
    `;

/**
 * __useGetNumberIslandsQuery__
 *
 * To run a query within a React component, call `useGetNumberIslandsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNumberIslandsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNumberIslandsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetNumberIslandsQuery(baseOptions?: Apollo.QueryHookOptions<GetNumberIslandsQuery, GetNumberIslandsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNumberIslandsQuery, GetNumberIslandsQueryVariables>(GetNumberIslandsDocument, options);
      }
export function useGetNumberIslandsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNumberIslandsQuery, GetNumberIslandsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNumberIslandsQuery, GetNumberIslandsQueryVariables>(GetNumberIslandsDocument, options);
        }
export function useGetNumberIslandsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetNumberIslandsQuery, GetNumberIslandsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetNumberIslandsQuery, GetNumberIslandsQueryVariables>(GetNumberIslandsDocument, options);
        }
export type GetNumberIslandsQueryHookResult = ReturnType<typeof useGetNumberIslandsQuery>;
export type GetNumberIslandsLazyQueryHookResult = ReturnType<typeof useGetNumberIslandsLazyQuery>;
export type GetNumberIslandsSuspenseQueryHookResult = ReturnType<typeof useGetNumberIslandsSuspenseQuery>;
export type GetNumberIslandsQueryResult = Apollo.QueryResult<GetNumberIslandsQuery, GetNumberIslandsQueryVariables>;
export const GetTopPlayersDocument = gql`
    query GetTopPlayers($input: TopPlayersInput!) {
  topPlayers(input: $input) {
    ... on TopPlayers {
      players {
        id
        name
        scoresheet {
          id
          score
        }
      }
    }
  }
}
    `;

/**
 * __useGetTopPlayersQuery__
 *
 * To run a query within a React component, call `useGetTopPlayersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTopPlayersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTopPlayersQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetTopPlayersQuery(baseOptions: Apollo.QueryHookOptions<GetTopPlayersQuery, GetTopPlayersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTopPlayersQuery, GetTopPlayersQueryVariables>(GetTopPlayersDocument, options);
      }
export function useGetTopPlayersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTopPlayersQuery, GetTopPlayersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTopPlayersQuery, GetTopPlayersQueryVariables>(GetTopPlayersDocument, options);
        }
export function useGetTopPlayersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetTopPlayersQuery, GetTopPlayersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTopPlayersQuery, GetTopPlayersQueryVariables>(GetTopPlayersDocument, options);
        }
export type GetTopPlayersQueryHookResult = ReturnType<typeof useGetTopPlayersQuery>;
export type GetTopPlayersLazyQueryHookResult = ReturnType<typeof useGetTopPlayersLazyQuery>;
export type GetTopPlayersSuspenseQueryHookResult = ReturnType<typeof useGetTopPlayersSuspenseQuery>;
export type GetTopPlayersQueryResult = Apollo.QueryResult<GetTopPlayersQuery, GetTopPlayersQueryVariables>;
export const SearchIslandsDocument = gql`
    query SearchIslands($term: String!) {
  searchIslands(term: $term) {
    ... on IslandList {
      islands {
        id
        name
      }
    }
  }
}
    `;

/**
 * __useSearchIslandsQuery__
 *
 * To run a query within a React component, call `useSearchIslandsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchIslandsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchIslandsQuery({
 *   variables: {
 *      term: // value for 'term'
 *   },
 * });
 */
export function useSearchIslandsQuery(baseOptions: Apollo.QueryHookOptions<SearchIslandsQuery, SearchIslandsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchIslandsQuery, SearchIslandsQueryVariables>(SearchIslandsDocument, options);
      }
export function useSearchIslandsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchIslandsQuery, SearchIslandsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchIslandsQuery, SearchIslandsQueryVariables>(SearchIslandsDocument, options);
        }
export function useSearchIslandsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<SearchIslandsQuery, SearchIslandsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SearchIslandsQuery, SearchIslandsQueryVariables>(SearchIslandsDocument, options);
        }
export type SearchIslandsQueryHookResult = ReturnType<typeof useSearchIslandsQuery>;
export type SearchIslandsLazyQueryHookResult = ReturnType<typeof useSearchIslandsLazyQuery>;
export type SearchIslandsSuspenseQueryHookResult = ReturnType<typeof useSearchIslandsSuspenseQuery>;
export type SearchIslandsQueryResult = Apollo.QueryResult<SearchIslandsQuery, SearchIslandsQueryVariables>;
export const GetCitizenDocument = gql`
    query GetCitizen($input: CitizenInput!) {
  citizen(input: $input) {
    __typename
    ... on Citizen {
      id
      name
      createdAt
    }
  }
}
    `;

/**
 * __useGetCitizenQuery__
 *
 * To run a query within a React component, call `useGetCitizenQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCitizenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCitizenQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetCitizenQuery(baseOptions: Apollo.QueryHookOptions<GetCitizenQuery, GetCitizenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCitizenQuery, GetCitizenQueryVariables>(GetCitizenDocument, options);
      }
export function useGetCitizenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCitizenQuery, GetCitizenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCitizenQuery, GetCitizenQueryVariables>(GetCitizenDocument, options);
        }
export function useGetCitizenSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetCitizenQuery, GetCitizenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCitizenQuery, GetCitizenQueryVariables>(GetCitizenDocument, options);
        }
export type GetCitizenQueryHookResult = ReturnType<typeof useGetCitizenQuery>;
export type GetCitizenLazyQueryHookResult = ReturnType<typeof useGetCitizenLazyQuery>;
export type GetCitizenSuspenseQueryHookResult = ReturnType<typeof useGetCitizenSuspenseQuery>;
export type GetCitizenQueryResult = Apollo.QueryResult<GetCitizenQuery, GetCitizenQueryVariables>;
export const GetCitizensDocument = gql`
    query GetCitizens($input: CitizensFromIslandInput!) {
  citizensFromIsland(input: $input) {
    ... on CitizenList {
      citizens {
        id
        createdAt
        name
      }
    }
  }
}
    `;

/**
 * __useGetCitizensQuery__
 *
 * To run a query within a React component, call `useGetCitizensQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCitizensQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCitizensQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetCitizensQuery(baseOptions: Apollo.QueryHookOptions<GetCitizensQuery, GetCitizensQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCitizensQuery, GetCitizensQueryVariables>(GetCitizensDocument, options);
      }
export function useGetCitizensLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCitizensQuery, GetCitizensQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCitizensQuery, GetCitizensQueryVariables>(GetCitizensDocument, options);
        }
export function useGetCitizensSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetCitizensQuery, GetCitizensQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCitizensQuery, GetCitizensQueryVariables>(GetCitizensDocument, options);
        }
export type GetCitizensQueryHookResult = ReturnType<typeof useGetCitizensQuery>;
export type GetCitizensLazyQueryHookResult = ReturnType<typeof useGetCitizensLazyQuery>;
export type GetCitizensSuspenseQueryHookResult = ReturnType<typeof useGetCitizensSuspenseQuery>;
export type GetCitizensQueryResult = Apollo.QueryResult<GetCitizensQuery, GetCitizensQueryVariables>;
export const GetEventsDocument = gql`
    query GetEvents($input: EventsInput!) {
  events(input: $input) {
    ... on EventList {
      events {
        ... on AccountCreation {
          __typename
          id
          happenedAt
        }
        ... on SellTradeOrderExecution {
          __typename
          id
          happenedAt
          currency {
            code
          }
          commodity
          commodityCurrency {
            code
          }
          quantity
          price
        }
        ... on BuyTradeOrderExecution {
          __typename
          id
          happenedAt
          currency {
            code
          }
          commodity
          commodityCurrency {
            code
          }
          quantity
          price
        }
      }
    }
  }
}
    `;

/**
 * __useGetEventsQuery__
 *
 * To run a query within a React component, call `useGetEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEventsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetEventsQuery(baseOptions: Apollo.QueryHookOptions<GetEventsQuery, GetEventsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEventsQuery, GetEventsQueryVariables>(GetEventsDocument, options);
      }
export function useGetEventsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEventsQuery, GetEventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEventsQuery, GetEventsQueryVariables>(GetEventsDocument, options);
        }
export function useGetEventsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetEventsQuery, GetEventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetEventsQuery, GetEventsQueryVariables>(GetEventsDocument, options);
        }
export type GetEventsQueryHookResult = ReturnType<typeof useGetEventsQuery>;
export type GetEventsLazyQueryHookResult = ReturnType<typeof useGetEventsLazyQuery>;
export type GetEventsSuspenseQueryHookResult = ReturnType<typeof useGetEventsSuspenseQuery>;
export type GetEventsQueryResult = Apollo.QueryResult<GetEventsQuery, GetEventsQueryVariables>;
export const GetTilesDocument = gql`
    query GetTiles($islandId: String!) {
  island(islandId: $islandId) {
    ... on Island {
      id
      tiles {
        id
        position
        kind
        infrastructure
        level
        desiredStatus
        currentStatus
        population
        material
        food
        frozenFood
        energy
        island {
          id
        }
      }
    }
  }
}
    `;

/**
 * __useGetTilesQuery__
 *
 * To run a query within a React component, call `useGetTilesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTilesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTilesQuery({
 *   variables: {
 *      islandId: // value for 'islandId'
 *   },
 * });
 */
export function useGetTilesQuery(baseOptions: Apollo.QueryHookOptions<GetTilesQuery, GetTilesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTilesQuery, GetTilesQueryVariables>(GetTilesDocument, options);
      }
export function useGetTilesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTilesQuery, GetTilesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTilesQuery, GetTilesQueryVariables>(GetTilesDocument, options);
        }
export function useGetTilesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetTilesQuery, GetTilesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTilesQuery, GetTilesQueryVariables>(GetTilesDocument, options);
        }
export type GetTilesQueryHookResult = ReturnType<typeof useGetTilesQuery>;
export type GetTilesLazyQueryHookResult = ReturnType<typeof useGetTilesLazyQuery>;
export type GetTilesSuspenseQueryHookResult = ReturnType<typeof useGetTilesSuspenseQuery>;
export type GetTilesQueryResult = Apollo.QueryResult<GetTilesQuery, GetTilesQueryVariables>;
export const GetIslandDocument = gql`
    query GetIsland($islandId: String!) {
  island(islandId: $islandId) {
    ... on Island {
      id
      owner {
        id
        username
      }
      tiles {
        id
        position
        infrastructure
        level
      }
    }
  }
}
    `;

/**
 * __useGetIslandQuery__
 *
 * To run a query within a React component, call `useGetIslandQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetIslandQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetIslandQuery({
 *   variables: {
 *      islandId: // value for 'islandId'
 *   },
 * });
 */
export function useGetIslandQuery(baseOptions: Apollo.QueryHookOptions<GetIslandQuery, GetIslandQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetIslandQuery, GetIslandQueryVariables>(GetIslandDocument, options);
      }
export function useGetIslandLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetIslandQuery, GetIslandQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetIslandQuery, GetIslandQueryVariables>(GetIslandDocument, options);
        }
export function useGetIslandSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetIslandQuery, GetIslandQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetIslandQuery, GetIslandQueryVariables>(GetIslandDocument, options);
        }
export type GetIslandQueryHookResult = ReturnType<typeof useGetIslandQuery>;
export type GetIslandLazyQueryHookResult = ReturnType<typeof useGetIslandLazyQuery>;
export type GetIslandSuspenseQueryHookResult = ReturnType<typeof useGetIslandSuspenseQuery>;
export type GetIslandQueryResult = Apollo.QueryResult<GetIslandQuery, GetIslandQueryVariables>;
export const GetIslandOverviewDocument = gql`
    query GetIslandOverview($islandId: String!) {
  island(islandId: $islandId) {
    ... on Island {
      id
      name
      owner {
        id
        name
      }
    }
  }
}
    `;

/**
 * __useGetIslandOverviewQuery__
 *
 * To run a query within a React component, call `useGetIslandOverviewQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetIslandOverviewQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetIslandOverviewQuery({
 *   variables: {
 *      islandId: // value for 'islandId'
 *   },
 * });
 */
export function useGetIslandOverviewQuery(baseOptions: Apollo.QueryHookOptions<GetIslandOverviewQuery, GetIslandOverviewQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetIslandOverviewQuery, GetIslandOverviewQueryVariables>(GetIslandOverviewDocument, options);
      }
export function useGetIslandOverviewLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetIslandOverviewQuery, GetIslandOverviewQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetIslandOverviewQuery, GetIslandOverviewQueryVariables>(GetIslandOverviewDocument, options);
        }
export function useGetIslandOverviewSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetIslandOverviewQuery, GetIslandOverviewQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetIslandOverviewQuery, GetIslandOverviewQueryVariables>(GetIslandOverviewDocument, options);
        }
export type GetIslandOverviewQueryHookResult = ReturnType<typeof useGetIslandOverviewQuery>;
export type GetIslandOverviewLazyQueryHookResult = ReturnType<typeof useGetIslandOverviewLazyQuery>;
export type GetIslandOverviewSuspenseQueryHookResult = ReturnType<typeof useGetIslandOverviewSuspenseQuery>;
export type GetIslandOverviewQueryResult = Apollo.QueryResult<GetIslandOverviewQuery, GetIslandOverviewQueryVariables>;
export const GetPlayerProfileDocument = gql`
    query GetPlayerProfile($input: PlayerInput!) {
  player(input: $input) {
    ... on Player {
      scoresheet {
        id
        score
        commodities {
          commodity
          score
        }
        buildings {
          score
        }
        currencies {
          currency {
            id
          }
          score
        }
      }
      badges {
        id
        createdAt
        type
      }
    }
  }
}
    `;

/**
 * __useGetPlayerProfileQuery__
 *
 * To run a query within a React component, call `useGetPlayerProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPlayerProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPlayerProfileQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetPlayerProfileQuery(baseOptions: Apollo.QueryHookOptions<GetPlayerProfileQuery, GetPlayerProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPlayerProfileQuery, GetPlayerProfileQueryVariables>(GetPlayerProfileDocument, options);
      }
export function useGetPlayerProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPlayerProfileQuery, GetPlayerProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPlayerProfileQuery, GetPlayerProfileQueryVariables>(GetPlayerProfileDocument, options);
        }
export function useGetPlayerProfileSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetPlayerProfileQuery, GetPlayerProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPlayerProfileQuery, GetPlayerProfileQueryVariables>(GetPlayerProfileDocument, options);
        }
export type GetPlayerProfileQueryHookResult = ReturnType<typeof useGetPlayerProfileQuery>;
export type GetPlayerProfileLazyQueryHookResult = ReturnType<typeof useGetPlayerProfileLazyQuery>;
export type GetPlayerProfileSuspenseQueryHookResult = ReturnType<typeof useGetPlayerProfileSuspenseQuery>;
export type GetPlayerProfileQueryResult = Apollo.QueryResult<GetPlayerProfileQuery, GetPlayerProfileQueryVariables>;
export const GetTileDocument = gql`
    query GetTile($islandId: String!, $position: Int!) {
  tile(islandId: $islandId, position: $position) {
    ... on Tile {
      id
      position
      kind
      infrastructure
      level
      maxLevel
      desiredStatus
      currentStatus
      population
      energy
      material
      food
      frozenFood
      frozenFoodStorage
      constructionSite {
        id
        infrastructure
        workloadLeft
        finishedAt
      }
      blueprints {
        infrastructure
        materialCost
        workload
      }
    }
  }
}
    `;

/**
 * __useGetTileQuery__
 *
 * To run a query within a React component, call `useGetTileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTileQuery({
 *   variables: {
 *      islandId: // value for 'islandId'
 *      position: // value for 'position'
 *   },
 * });
 */
export function useGetTileQuery(baseOptions: Apollo.QueryHookOptions<GetTileQuery, GetTileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTileQuery, GetTileQueryVariables>(GetTileDocument, options);
      }
export function useGetTileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTileQuery, GetTileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTileQuery, GetTileQueryVariables>(GetTileDocument, options);
        }
export function useGetTileSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetTileQuery, GetTileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTileQuery, GetTileQueryVariables>(GetTileDocument, options);
        }
export type GetTileQueryHookResult = ReturnType<typeof useGetTileQuery>;
export type GetTileLazyQueryHookResult = ReturnType<typeof useGetTileLazyQuery>;
export type GetTileSuspenseQueryHookResult = ReturnType<typeof useGetTileSuspenseQuery>;
export type GetTileQueryResult = Apollo.QueryResult<GetTileQuery, GetTileQueryVariables>;
export const BuildInfrastructureDocument = gql`
    mutation BuildInfrastructure($islandId: String!, $position: Int!, $infrastructure: Infrastructure!) {
  buildInfrastructure(
    islandId: $islandId
    position: $position
    infrastructure: $infrastructure
  ) {
    ... on Tile {
      id
      infrastructure
      level
      constructionSite {
        id
        infrastructure
        workloadLeft
        finishedAt
        tile {
          position
        }
      }
      blueprints {
        infrastructure
        materialCost
        workload
      }
      island {
        id
        inventory {
          id
          material
        }
      }
    }
  }
}
    `;
export type BuildInfrastructureMutationFn = Apollo.MutationFunction<BuildInfrastructureMutation, BuildInfrastructureMutationVariables>;

/**
 * __useBuildInfrastructureMutation__
 *
 * To run a mutation, you first call `useBuildInfrastructureMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBuildInfrastructureMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [buildInfrastructureMutation, { data, loading, error }] = useBuildInfrastructureMutation({
 *   variables: {
 *      islandId: // value for 'islandId'
 *      position: // value for 'position'
 *      infrastructure: // value for 'infrastructure'
 *   },
 * });
 */
export function useBuildInfrastructureMutation(baseOptions?: Apollo.MutationHookOptions<BuildInfrastructureMutation, BuildInfrastructureMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BuildInfrastructureMutation, BuildInfrastructureMutationVariables>(BuildInfrastructureDocument, options);
      }
export type BuildInfrastructureMutationHookResult = ReturnType<typeof useBuildInfrastructureMutation>;
export type BuildInfrastructureMutationResult = Apollo.MutationResult<BuildInfrastructureMutation>;
export type BuildInfrastructureMutationOptions = Apollo.BaseMutationOptions<BuildInfrastructureMutation, BuildInfrastructureMutationVariables>;
export const CancelConstructionDocument = gql`
    mutation CancelConstruction($islandId: String!, $position: Int!) {
  cancelConstruction(islandId: $islandId, position: $position) {
    ... on Tile {
      id
      position
      infrastructure
      level
      constructionSite {
        id
      }
      blueprints {
        infrastructure
        materialCost
        workload
      }
      island {
        id
        inventory {
          id
          material
        }
      }
    }
  }
}
    `;
export type CancelConstructionMutationFn = Apollo.MutationFunction<CancelConstructionMutation, CancelConstructionMutationVariables>;

/**
 * __useCancelConstructionMutation__
 *
 * To run a mutation, you first call `useCancelConstructionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelConstructionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelConstructionMutation, { data, loading, error }] = useCancelConstructionMutation({
 *   variables: {
 *      islandId: // value for 'islandId'
 *      position: // value for 'position'
 *   },
 * });
 */
export function useCancelConstructionMutation(baseOptions?: Apollo.MutationHookOptions<CancelConstructionMutation, CancelConstructionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CancelConstructionMutation, CancelConstructionMutationVariables>(CancelConstructionDocument, options);
      }
export type CancelConstructionMutationHookResult = ReturnType<typeof useCancelConstructionMutation>;
export type CancelConstructionMutationResult = Apollo.MutationResult<CancelConstructionMutation>;
export type CancelConstructionMutationOptions = Apollo.BaseMutationOptions<CancelConstructionMutation, CancelConstructionMutationVariables>;
export const UpgradeInfrastructureDocument = gql`
    mutation UpgradeInfrastructure($islandId: String!, $position: Int!) {
  upgradeInfrastructure(islandId: $islandId, position: $position) {
    ... on Tile {
      id
      infrastructure
      level
      constructionSite {
        id
        infrastructure
        workloadLeft
        finishedAt
        tile {
          position
        }
      }
      blueprints {
        infrastructure
        materialCost
        workload
      }
      island {
        id
        inventory {
          id
          material
        }
      }
    }
  }
}
    `;
export type UpgradeInfrastructureMutationFn = Apollo.MutationFunction<UpgradeInfrastructureMutation, UpgradeInfrastructureMutationVariables>;

/**
 * __useUpgradeInfrastructureMutation__
 *
 * To run a mutation, you first call `useUpgradeInfrastructureMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpgradeInfrastructureMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upgradeInfrastructureMutation, { data, loading, error }] = useUpgradeInfrastructureMutation({
 *   variables: {
 *      islandId: // value for 'islandId'
 *      position: // value for 'position'
 *   },
 * });
 */
export function useUpgradeInfrastructureMutation(baseOptions?: Apollo.MutationHookOptions<UpgradeInfrastructureMutation, UpgradeInfrastructureMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpgradeInfrastructureMutation, UpgradeInfrastructureMutationVariables>(UpgradeInfrastructureDocument, options);
      }
export type UpgradeInfrastructureMutationHookResult = ReturnType<typeof useUpgradeInfrastructureMutation>;
export type UpgradeInfrastructureMutationResult = Apollo.MutationResult<UpgradeInfrastructureMutation>;
export type UpgradeInfrastructureMutationOptions = Apollo.BaseMutationOptions<UpgradeInfrastructureMutation, UpgradeInfrastructureMutationVariables>;
export const DestroyInfrastructureDocument = gql`
    mutation DestroyInfrastructure($islandId: String!, $position: Int!) {
  destroyInfrastructure(islandId: $islandId, position: $position) {
    ... on Tile {
      id
      infrastructure
      level
      constructionSite {
        finishedAt
      }
      blueprints {
        infrastructure
        materialCost
        workload
      }
    }
  }
}
    `;
export type DestroyInfrastructureMutationFn = Apollo.MutationFunction<DestroyInfrastructureMutation, DestroyInfrastructureMutationVariables>;

/**
 * __useDestroyInfrastructureMutation__
 *
 * To run a mutation, you first call `useDestroyInfrastructureMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDestroyInfrastructureMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [destroyInfrastructureMutation, { data, loading, error }] = useDestroyInfrastructureMutation({
 *   variables: {
 *      islandId: // value for 'islandId'
 *      position: // value for 'position'
 *   },
 * });
 */
export function useDestroyInfrastructureMutation(baseOptions?: Apollo.MutationHookOptions<DestroyInfrastructureMutation, DestroyInfrastructureMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DestroyInfrastructureMutation, DestroyInfrastructureMutationVariables>(DestroyInfrastructureDocument, options);
      }
export type DestroyInfrastructureMutationHookResult = ReturnType<typeof useDestroyInfrastructureMutation>;
export type DestroyInfrastructureMutationResult = Apollo.MutationResult<DestroyInfrastructureMutation>;
export type DestroyInfrastructureMutationOptions = Apollo.BaseMutationOptions<DestroyInfrastructureMutation, DestroyInfrastructureMutationVariables>;
export const GetBankLevelsDocument = gql`
    query GetBankLevels($userId: String!, $islandId: String!) {
  inventory(userId: $userId, islandId: $islandId) {
    __typename
    ... on Inventory {
      id
      bankLevels
    }
  }
}
    `;

/**
 * __useGetBankLevelsQuery__
 *
 * To run a query within a React component, call `useGetBankLevelsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBankLevelsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBankLevelsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      islandId: // value for 'islandId'
 *   },
 * });
 */
export function useGetBankLevelsQuery(baseOptions: Apollo.QueryHookOptions<GetBankLevelsQuery, GetBankLevelsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBankLevelsQuery, GetBankLevelsQueryVariables>(GetBankLevelsDocument, options);
      }
export function useGetBankLevelsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBankLevelsQuery, GetBankLevelsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBankLevelsQuery, GetBankLevelsQueryVariables>(GetBankLevelsDocument, options);
        }
export function useGetBankLevelsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetBankLevelsQuery, GetBankLevelsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetBankLevelsQuery, GetBankLevelsQueryVariables>(GetBankLevelsDocument, options);
        }
export type GetBankLevelsQueryHookResult = ReturnType<typeof useGetBankLevelsQuery>;
export type GetBankLevelsLazyQueryHookResult = ReturnType<typeof useGetBankLevelsLazyQuery>;
export type GetBankLevelsSuspenseQueryHookResult = ReturnType<typeof useGetBankLevelsSuspenseQuery>;
export type GetBankLevelsQueryResult = Apollo.QueryResult<GetBankLevelsQuery, GetBankLevelsQueryVariables>;
export const GetMarketPricesDocument = gql`
    query GetMarketPrices($input: MarketPricesInput!) {
  marketPrices(input: $input) {
    __typename
    ... on MarketPrices {
      prices {
        timestamp
        currency {
          id
        }
        commodity
        numTrades
        quantity
        price
        prevNumTrades
        prevQuantity
        prevPrice
      }
    }
  }
}
    `;

/**
 * __useGetMarketPricesQuery__
 *
 * To run a query within a React component, call `useGetMarketPricesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMarketPricesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMarketPricesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetMarketPricesQuery(baseOptions: Apollo.QueryHookOptions<GetMarketPricesQuery, GetMarketPricesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMarketPricesQuery, GetMarketPricesQueryVariables>(GetMarketPricesDocument, options);
      }
export function useGetMarketPricesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMarketPricesQuery, GetMarketPricesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMarketPricesQuery, GetMarketPricesQueryVariables>(GetMarketPricesDocument, options);
        }
export function useGetMarketPricesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetMarketPricesQuery, GetMarketPricesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMarketPricesQuery, GetMarketPricesQueryVariables>(GetMarketPricesDocument, options);
        }
export type GetMarketPricesQueryHookResult = ReturnType<typeof useGetMarketPricesQuery>;
export type GetMarketPricesLazyQueryHookResult = ReturnType<typeof useGetMarketPricesLazyQuery>;
export type GetMarketPricesSuspenseQueryHookResult = ReturnType<typeof useGetMarketPricesSuspenseQuery>;
export type GetMarketPricesQueryResult = Apollo.QueryResult<GetMarketPricesQuery, GetMarketPricesQueryVariables>;
export const GetCurrentMarketPricesDocument = gql`
    query GetCurrentMarketPrices($input: CurrentMarketPricesInput!) {
  currentMarketPrices(input: $input) {
    ... on CurrentMarketPrices {
      commodityPrices {
        commodity
        price
      }
      currencyPrices {
        currency {
          id
          code
          name
        }
        price
      }
    }
  }
}
    `;

/**
 * __useGetCurrentMarketPricesQuery__
 *
 * To run a query within a React component, call `useGetCurrentMarketPricesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentMarketPricesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentMarketPricesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetCurrentMarketPricesQuery(baseOptions: Apollo.QueryHookOptions<GetCurrentMarketPricesQuery, GetCurrentMarketPricesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCurrentMarketPricesQuery, GetCurrentMarketPricesQueryVariables>(GetCurrentMarketPricesDocument, options);
      }
export function useGetCurrentMarketPricesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCurrentMarketPricesQuery, GetCurrentMarketPricesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCurrentMarketPricesQuery, GetCurrentMarketPricesQueryVariables>(GetCurrentMarketPricesDocument, options);
        }
export function useGetCurrentMarketPricesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetCurrentMarketPricesQuery, GetCurrentMarketPricesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCurrentMarketPricesQuery, GetCurrentMarketPricesQueryVariables>(GetCurrentMarketPricesDocument, options);
        }
export type GetCurrentMarketPricesQueryHookResult = ReturnType<typeof useGetCurrentMarketPricesQuery>;
export type GetCurrentMarketPricesLazyQueryHookResult = ReturnType<typeof useGetCurrentMarketPricesLazyQuery>;
export type GetCurrentMarketPricesSuspenseQueryHookResult = ReturnType<typeof useGetCurrentMarketPricesSuspenseQuery>;
export type GetCurrentMarketPricesQueryResult = Apollo.QueryResult<GetCurrentMarketPricesQuery, GetCurrentMarketPricesQueryVariables>;
export const SendTradeOrderDocument = gql`
    mutation SendTradeOrder($input: SendTradeOrderInput!) {
  sendTradeOrder(input: $input) {
    __typename
    ... on TradeOrder {
      id
      createdAt
      expiresAt
      side
      currency {
        id
        code
        name
      }
      commodity
      quantity
      price
    }
  }
}
    `;
export type SendTradeOrderMutationFn = Apollo.MutationFunction<SendTradeOrderMutation, SendTradeOrderMutationVariables>;

/**
 * __useSendTradeOrderMutation__
 *
 * To run a mutation, you first call `useSendTradeOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendTradeOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendTradeOrderMutation, { data, loading, error }] = useSendTradeOrderMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSendTradeOrderMutation(baseOptions?: Apollo.MutationHookOptions<SendTradeOrderMutation, SendTradeOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendTradeOrderMutation, SendTradeOrderMutationVariables>(SendTradeOrderDocument, options);
      }
export type SendTradeOrderMutationHookResult = ReturnType<typeof useSendTradeOrderMutation>;
export type SendTradeOrderMutationResult = Apollo.MutationResult<SendTradeOrderMutation>;
export type SendTradeOrderMutationOptions = Apollo.BaseMutationOptions<SendTradeOrderMutation, SendTradeOrderMutationVariables>;
export const GetMyOpenOrdersDocument = gql`
    query GetMyOpenOrders($userId: String!) {
  myOpenTradeOrders(userId: $userId) {
    __typename
    ... on TradeOrderList {
      orders {
        id
        side
        expiresAt
        currency {
          id
          code
        }
        commodity
        quantity
        price
      }
    }
  }
}
    `;

/**
 * __useGetMyOpenOrdersQuery__
 *
 * To run a query within a React component, call `useGetMyOpenOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyOpenOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyOpenOrdersQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetMyOpenOrdersQuery(baseOptions: Apollo.QueryHookOptions<GetMyOpenOrdersQuery, GetMyOpenOrdersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyOpenOrdersQuery, GetMyOpenOrdersQueryVariables>(GetMyOpenOrdersDocument, options);
      }
export function useGetMyOpenOrdersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyOpenOrdersQuery, GetMyOpenOrdersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyOpenOrdersQuery, GetMyOpenOrdersQueryVariables>(GetMyOpenOrdersDocument, options);
        }
export function useGetMyOpenOrdersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetMyOpenOrdersQuery, GetMyOpenOrdersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMyOpenOrdersQuery, GetMyOpenOrdersQueryVariables>(GetMyOpenOrdersDocument, options);
        }
export type GetMyOpenOrdersQueryHookResult = ReturnType<typeof useGetMyOpenOrdersQuery>;
export type GetMyOpenOrdersLazyQueryHookResult = ReturnType<typeof useGetMyOpenOrdersLazyQuery>;
export type GetMyOpenOrdersSuspenseQueryHookResult = ReturnType<typeof useGetMyOpenOrdersSuspenseQuery>;
export type GetMyOpenOrdersQueryResult = Apollo.QueryResult<GetMyOpenOrdersQuery, GetMyOpenOrdersQueryVariables>;
export const GetPublicPlayerProfileDocument = gql`
    query GetPublicPlayerProfile($input: PlayerInput!) {
  player(input: $input) {
    ... on Player {
      id
      name
      island {
        name
        tiles {
          id
          position
          infrastructure
          level
        }
      }
      scoresheet {
        id
        score
        commodities {
          commodity
          score
        }
        buildings {
          score
        }
        currencies {
          currency {
            id
          }
          score
        }
      }
      badges {
        id
        createdAt
        type
      }
    }
  }
}
    `;

/**
 * __useGetPublicPlayerProfileQuery__
 *
 * To run a query within a React component, call `useGetPublicPlayerProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPublicPlayerProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPublicPlayerProfileQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetPublicPlayerProfileQuery(baseOptions: Apollo.QueryHookOptions<GetPublicPlayerProfileQuery, GetPublicPlayerProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPublicPlayerProfileQuery, GetPublicPlayerProfileQueryVariables>(GetPublicPlayerProfileDocument, options);
      }
export function useGetPublicPlayerProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPublicPlayerProfileQuery, GetPublicPlayerProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPublicPlayerProfileQuery, GetPublicPlayerProfileQueryVariables>(GetPublicPlayerProfileDocument, options);
        }
export function useGetPublicPlayerProfileSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetPublicPlayerProfileQuery, GetPublicPlayerProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPublicPlayerProfileQuery, GetPublicPlayerProfileQueryVariables>(GetPublicPlayerProfileDocument, options);
        }
export type GetPublicPlayerProfileQueryHookResult = ReturnType<typeof useGetPublicPlayerProfileQuery>;
export type GetPublicPlayerProfileLazyQueryHookResult = ReturnType<typeof useGetPublicPlayerProfileLazyQuery>;
export type GetPublicPlayerProfileSuspenseQueryHookResult = ReturnType<typeof useGetPublicPlayerProfileSuspenseQuery>;
export type GetPublicPlayerProfileQueryResult = Apollo.QueryResult<GetPublicPlayerProfileQuery, GetPublicPlayerProfileQueryVariables>;