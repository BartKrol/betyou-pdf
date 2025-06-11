/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
  /** An arbitrary-precision Decimal type */
  Decimal: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
};

export type AccountStatement = {
  __typename?: 'AccountStatement';
  payments: Array<PaymentsStatement>;
  wagers: Array<WagersStatement>;
};

export type Activity = {
  __typename?: 'Activity';
  totalBets: Scalars['Int'];
  totalRefunded: Scalars['Decimal'];
  totalWagered: Scalars['Decimal'];
  totalWon: Scalars['Decimal'];
};

export type AddEditNoteInput = {
  noteId?: InputMaybe<Scalars['ID']>;
  text: Scalars['String'];
  userId: Scalars['ID'];
};

export type AdminAudit = {
  __typename?: 'AdminAudit';
  created: Scalars['DateTime'];
  id: Scalars['ID'];
  isSuspended?: Maybe<Scalars['Boolean']>;
  lastDeactivated?: Maybe<Scalars['DateTime']>;
  lastLogin?: Maybe<Scalars['DateTime']>;
  lastPasswordChange?: Maybe<Scalars['DateTime']>;
  user: User;
};

/**
 * If autoDepositsConfig field is included, then the complete auto deposit config must be provided
 * (rather than a path or a partial update). This means that all of ACH, CREDIT_CARD, and DEMAND_FUNDS, etc,
 * must always be provided.
 */
export type AdminAutoDepositConfigUpdateInput = {
  ACH?: InputMaybe<Scalars['Int']>;
  CREDIT_CARD?: InputMaybe<Scalars['Int']>;
  DEMAND_FUNDS?: InputMaybe<Scalars['Int']>;
  GOOGLE_PAY?: InputMaybe<Scalars['Int']>;
  PAYPAL?: InputMaybe<Scalars['Int']>;
  VENMO?: InputMaybe<Scalars['Int']>;
};

export type AdminFullBalance = {
  __typename?: 'AdminFullBalance';
  accountsCount: Scalars['Int'];
  date: Scalars['DateTime'];
  systemBalance: Scalars['Decimal'];
};

export type AdminSettings = {
  __typename?: 'AdminSettings';
  evsVerification: Scalars['Boolean'];
  ipVerification: Scalars['Boolean'];
  maintenanceMode: Scalars['Boolean'];
  statesConfig: Array<StateConfig>;
};

export type AdminUserDataUpdateInput = {
  address: Scalars['String'];
  city: Scalars['String'];
  dateOfBirth: Scalars['DateTime'];
  phoneNumber: Scalars['String'];
  state: Scalars['String'];
  zipCode: Scalars['String'];
};

/**
 * Currently this only allows for modifying a subset of fields. In particular, fields like name or email which need to
 * be synced with AWS Cognito are currently excluded.
 */
export type AdminUserUpdateInput = {
  autoDepositsConfig?: InputMaybe<AdminAutoDepositConfigUpdateInput>;
  isActivated?: InputMaybe<Scalars['Boolean']>;
  isSuspended?: InputMaybe<Scalars['Boolean']>;
  isVerified?: InputMaybe<Scalars['Boolean']>;
};

export type Audit = {
  __typename?: 'Audit';
  createdAt: Scalars['DateTime'];
  details?: Maybe<Scalars['JSON']>;
  id: Scalars['ID'];
  kind: AuditKind;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['String']>;
};

export enum AuditKind {
  AcceptLegalDocument = 'ACCEPT_LEGAL_DOCUMENT',
  BalanceChange = 'BALANCE_CHANGE',
  UserActivated = 'USER_ACTIVATED',
  UserDisabled = 'USER_DISABLED',
  UserLogin = 'USER_LOGIN',
  UserSignup = 'USER_SIGNUP'
}

/**
 * Null limit for a payment method means that autodeposit is disabled.
 * Zero limit for a payment method means that autodeposit is unlimited.
 */
export type AutoDepositsConfig = {
  __typename?: 'AutoDepositsConfig';
  ACH?: Maybe<Scalars['Int']>;
  CREDIT_CARD?: Maybe<Scalars['Int']>;
  DEMAND_FUNDS?: Maybe<Scalars['Int']>;
  GOOGLE_PAY?: Maybe<Scalars['Int']>;
  PAYPAL?: Maybe<Scalars['Int']>;
  VENMO?: Maybe<Scalars['Int']>;
};

/** Current stats for autodeposit */
export type AutoDepositsStats = {
  __typename?: 'AutoDepositsStats';
  ACH?: Maybe<Scalars['Decimal']>;
  CREDIT_CARD?: Maybe<Scalars['Decimal']>;
  DEMAND_FUNDS?: Maybe<Scalars['Decimal']>;
  GOOGLE_PAY?: Maybe<Scalars['Decimal']>;
  PAYPAL?: Maybe<Scalars['Decimal']>;
  VENMO?: Maybe<Scalars['Decimal']>;
};

export type Bet = {
  __typename?: 'Bet';
  availableStake: Scalars['Decimal'];
  canJoin: Scalars['Boolean'];
  canceler?: Maybe<User>;
  cancelerId?: Maybe<Scalars['ID']>;
  createdAt: Scalars['DateTime'];
  creator: User;
  creatorId: Scalars['ID'];
  creatorOutcome: BetOutcome;
  currentUserIsInvited: Scalars['Boolean'];
  game: Game;
  gameId: Scalars['Int'];
  id: Scalars['ID'];
  invitations: BetInvitationConnection;
  isParticipating: Scalars['Boolean'];
  isPublic: Scalars['Boolean'];
  outcomes: BetOutcomeConnection;
  state: State;
  stateId: Scalars['ID'];
  status: BetStatus;
  title: Scalars['String'];
  titleForLayer: Scalars['String'];
  type: BetKind;
  updatedAt: Scalars['DateTime'];
  winner?: Maybe<User>;
  winnerOutcome?: Maybe<BetOutcomeKind>;
  /** A number between 0 and 1 indicating the percentage fee of the total payout */
  winningPercentageFee: Scalars['Float'];
};


export type BetCanJoinArgs = {
  position?: InputMaybe<Position>;
};


export type BetInvitationsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type BetOutcomesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type BetConnection = {
  __typename?: 'BetConnection';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types */
  edges: Array<BetEdge>;
  /** Flattened list of Bet type */
  nodes: Array<Bet>;
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
  pageInfo: PageInfo;
};

export type BetEdge = {
  __typename?: 'BetEdge';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Cursor */
  cursor: Scalars['String'];
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Node */
  node: Bet;
};

export enum BetFilter {
  Canceled = 'Canceled',
  Completed = 'Completed',
  Lost = 'Lost',
  Pending = 'Pending',
  Tie = 'Tie',
  Won = 'Won'
}

export type BetInvitation = {
  __typename?: 'BetInvitation';
  accepted: Scalars['Boolean'];
  bet: Bet;
  betId: Scalars['ID'];
  betOutcome?: Maybe<BetOutcome>;
  createdAt: Scalars['DateTime'];
  creator: User;
  creatorId: Scalars['ID'];
  guest: User;
  guestId: Scalars['ID'];
  id: Scalars['ID'];
  isCancelled: Scalars['Boolean'];
  outcomeType: BetOutcomeKind;
  stake?: Maybe<Scalars['Decimal']>;
  updatedAt: Scalars['DateTime'];
};

export type BetInvitationConnection = {
  __typename?: 'BetInvitationConnection';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types */
  edges: Array<BetInvitationEdge>;
  /** Flattened list of BetInvitation type */
  nodes: Array<BetInvitation>;
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
  pageInfo: PageInfo;
};

export type BetInvitationEdge = {
  __typename?: 'BetInvitationEdge';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Cursor */
  cursor: Scalars['String'];
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Node */
  node: BetInvitation;
};

export enum BetKind {
  MoneyLine = 'MONEY_LINE',
  OverUnder = 'OVER_UNDER',
  PointSpread = 'POINT_SPREAD'
}

export type BetOutcome = {
  __typename?: 'BetOutcome';
  bet: Bet;
  betId: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  creator: User;
  creatorId: Scalars['ID'];
  id: Scalars['ID'];
  invitation?: Maybe<BetInvitation>;
  invitationId?: Maybe<Scalars['ID']>;
  transaction: Transaction;
  transactionId: Scalars['ID'];
  type: BetOutcomeKind;
  updatedAt: Scalars['DateTime'];
};

export type BetOutcomeConnection = {
  __typename?: 'BetOutcomeConnection';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types */
  edges: Array<BetOutcomeEdge>;
  /** Flattened list of BetOutcome type */
  nodes: Array<BetOutcome>;
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
  pageInfo: PageInfo;
};

export type BetOutcomeEdge = {
  __typename?: 'BetOutcomeEdge';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Cursor */
  cursor: Scalars['String'];
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Node */
  node: BetOutcome;
};

export enum BetOutcomeKind {
  Away = 'AWAY',
  Home = 'HOME',
  Over = 'OVER',
  Tie = 'TIE',
  Under = 'UNDER'
}

export enum BetStatus {
  Close = 'CLOSE',
  Open = 'OPEN',
  Settled = 'SETTLED'
}

export type BetSummary = {
  __typename?: 'BetSummary';
  betsCanceled: Scalars['Int'];
  betsLost: Scalars['Int'];
  betsTie: Scalars['Int'];
  betsWon: Scalars['Int'];
  date: Scalars['String'];
  id: Scalars['ID'];
  moneyLost: Scalars['Decimal'];
  moneyTotal: Scalars['Decimal'];
  moneyWon: Scalars['Decimal'];
  totalBets: Scalars['Int'];
};

export type CreateBetInput = {
  betType: BetKind;
  creatorOutcomeType: BetOutcomeKind;
  gameId: Scalars['Int'];
  isPublic: Scalars['Boolean'];
  position: Position;
  potentialLayers: Array<Scalars['ID']>;
  stake: Scalars['Decimal'];
};

export type DateRangeInput = {
  endDate?: InputMaybe<Scalars['DateTime']>;
  startDate?: InputMaybe<Scalars['DateTime']>;
};

export type Document = {
  __typename?: 'Document';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  kind: LegalDocumentKind;
  name: Scalars['String'];
  referenceId: Scalars['ID'];
  state?: Maybe<State>;
  stateId?: Maybe<Scalars['ID']>;
  url: Scalars['String'];
};

export enum Error {
  Forbidden = 'FORBIDDEN',
  InsufficientFundsError = 'INSUFFICIENT_FUNDS_ERROR',
  InvalidInput = 'INVALID_INPUT',
  InvalidLocation = 'INVALID_LOCATION',
  LocationMismatch = 'LOCATION_MISMATCH',
  NoTimeLeftToCancelBet = 'NO_TIME_LEFT_TO_CANCEL_BET',
  NoTimeLeftToCreateBet = 'NO_TIME_LEFT_TO_CREATE_BET',
  NoTimeLeftToJoinBet = 'NO_TIME_LEFT_TO_JOIN_BET',
  Unauthorized = 'UNAUTHORIZED'
}

export type Game = {
  __typename?: 'Game';
  awayTeam: Team;
  awayTeamId: Scalars['ID'];
  awayTeamMoneyLine?: Maybe<Scalars['Float']>;
  awayTeamScore?: Maybe<Scalars['Float']>;
  /** A number between 0 and 1 indicating the percentage fee of the total payout */
  betWinningPercentageFee: Scalars['Float'];
  canceled?: Maybe<Scalars['Boolean']>;
  channel?: Maybe<Scalars['String']>;
  dateTime?: Maybe<Scalars['DateTime']>;
  day?: Maybe<Scalars['DateTime']>;
  gameKey?: Maybe<Scalars['String']>;
  geoLat?: Maybe<Scalars['Float']>;
  geoLong?: Maybe<Scalars['Float']>;
  globalAwayTeamId: Scalars['Int'];
  globalHomeTeamId: Scalars['Int'];
  homeTeam: Team;
  homeTeamId: Scalars['ID'];
  homeTeamMoneyLine?: Maybe<Scalars['Float']>;
  homeTeamScore?: Maybe<Scalars['Float']>;
  id: Scalars['Int'];
  isClosed?: Maybe<Scalars['Boolean']>;
  league: League;
  leagueId: Scalars['ID'];
  overUnder?: Maybe<Scalars['Float']>;
  pointSpread?: Maybe<Scalars['Float']>;
  pointSpreadAwayTeamMoneyLine?: Maybe<Scalars['Float']>;
  pointSpreadHomeTeamMoneyLine?: Maybe<Scalars['Float']>;
  scoreId?: Maybe<Scalars['Int']>;
  season?: Maybe<Scalars['Int']>;
  seasonType?: Maybe<Scalars['Int']>;
  sportDataStatus?: Maybe<Scalars['String']>;
  stadiumId?: Maybe<Scalars['ID']>;
  status: GameStatus;
  weatherConditions?: Maybe<StadiumWeatherCondition>;
  weatherConditionsId?: Maybe<Scalars['ID']>;
  week?: Maybe<Scalars['Int']>;
};

export type GameConnection = {
  __typename?: 'GameConnection';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types */
  edges: Array<GameEdge>;
  /** Flattened list of Game type */
  nodes: Array<Game>;
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
  pageInfo: PageInfo;
};

export type GameEdge = {
  __typename?: 'GameEdge';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Cursor */
  cursor: Scalars['String'];
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Node */
  node: Game;
};

export enum GameStatus {
  Archived = 'ARCHIVED',
  Cancelled = 'CANCELLED',
  Finished = 'FINISHED',
  InPlay = 'IN_PLAY',
  Postponed = 'POSTPONED',
  Scheduled = 'SCHEDULED',
  Settled = 'SETTLED'
}

export enum ImagePosition {
  L = 'L',
  R = 'R'
}

export type KeyValue = {
  __typename?: 'KeyValue';
  Key: Scalars['String'];
  Value: Scalars['String'];
};

export type KeyValueInput = {
  Key: Scalars['String'];
  Value: Scalars['String'];
};

export type League = {
  __typename?: 'League';
  id: Scalars['ID'];
  name: Scalars['String'];
  order: Scalars['Int'];
  primaryColor: Scalars['String'];
  schedule: GameConnection;
  secondaryColor: Scalars['String'];
  sport: Sport;
  teams: TeamConnection;
};


export type LeagueScheduleArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type LeagueTeamsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export enum LegalDocumentKind {
  PlayerProtectionInformation = 'PLAYER_PROTECTION_INFORMATION',
  PrivacyPolicy = 'PRIVACY_POLICY',
  TermsAndConditions = 'TERMS_AND_CONDITIONS',
  WageringRulesAndContent = 'WAGERING_RULES_AND_CONTENT'
}

export type LegalDocumentsPayload = {
  __typename?: 'LegalDocumentsPayload';
  id: Scalars['ID'];
  playerProtectionInformation: Document;
  privacyPolicy: Document;
  termsAndConditions: Document;
  wageringRulesAndContent: Document;
};

export type Mutation = {
  __typename?: 'Mutation';
  acceptBetInvitation?: Maybe<Bet>;
  acceptLegalDocument?: Maybe<User>;
  addEditNote?: Maybe<Note>;
  addFriend?: Maybe<User>;
  adminAcceptPayment: Payment;
  adminMakeTransaction: Transaction;
  adminUserDataUpdate: UserPersonalData;
  cancelBet?: Maybe<Bet>;
  cancelBetInvitation?: Maybe<BetInvitation>;
  createBet?: Maybe<Bet>;
  createPayNearMeOrder?: Maybe<PayNearMeOrder>;
  joinBet?: Maybe<Bet>;
  payNearMeWithdrawal?: Maybe<PayNearMePayment>;
  paymentFromSightline?: Maybe<SightlinePayment>;
  paymentToSightline?: Maybe<Payment>;
  removeFriend?: Maybe<User>;
  /** @deprecated Use SPAN Express instead */
  sightlineEnroll?: Maybe<SightlineEnrollmentStatus>;
  signUpUser: User;
  updateAdminSettings: AdminSettings;
  uploadDriverLicense?: Maybe<User>;
  uploadLegalDocument: Document;
  userUpdate: User;
  verifyUserIdentity: User;
};


export type MutationAcceptBetInvitationArgs = {
  betId: Scalars['ID'];
  position?: InputMaybe<Position>;
};


export type MutationAcceptLegalDocumentArgs = {
  legalDocumentIds: Array<Scalars['ID']>;
};


export type MutationAddEditNoteArgs = {
  input: AddEditNoteInput;
};


export type MutationAddFriendArgs = {
  friendId: Scalars['ID'];
  userId: Scalars['ID'];
};


export type MutationAdminAcceptPaymentArgs = {
  newAmount?: InputMaybe<Scalars['Decimal']>;
  note: Scalars['String'];
  paymentId: Scalars['ID'];
};


export type MutationAdminMakeTransactionArgs = {
  amount: Scalars['Decimal'];
  kind: PaymentKind;
  userId: Scalars['ID'];
};


export type MutationAdminUserDataUpdateArgs = {
  id: Scalars['ID'];
  input: AdminUserDataUpdateInput;
};


export type MutationCancelBetArgs = {
  betId: Scalars['ID'];
  position: Position;
};


export type MutationCancelBetInvitationArgs = {
  betId?: InputMaybe<Scalars['ID']>;
  invitationId?: InputMaybe<Scalars['ID']>;
  position?: InputMaybe<Position>;
};


export type MutationCreateBetArgs = {
  input: CreateBetInput;
};


export type MutationCreatePayNearMeOrderArgs = {
  kind: PayNearMeOrderKind;
};


export type MutationJoinBetArgs = {
  betId?: InputMaybe<Scalars['ID']>;
  invitationId?: InputMaybe<Scalars['ID']>;
  position: Position;
  stake: Scalars['Decimal'];
};


export type MutationPayNearMeWithdrawalArgs = {
  input: PayNearMeWithdrawalInput;
};


export type MutationPaymentFromSightlineArgs = {
  input: PaymentFromSightlineInput;
};


export type MutationPaymentToSightlineArgs = {
  input: PaymentToSightlineInput;
};


export type MutationRemoveFriendArgs = {
  friendId: Scalars['ID'];
  userId: Scalars['ID'];
};


export type MutationSightlineEnrollArgs = {
  input: SightlineEnrollInput;
};


export type MutationSignUpUserArgs = {
  input: SignUpInput;
};


export type MutationUpdateAdminSettingsArgs = {
  input: UpdateAdminSettingsInput;
};


export type MutationUploadDriverLicenseArgs = {
  input: UploadDriverLicenseInput;
};


export type MutationUploadLegalDocumentArgs = {
  input: UploadLegalDocumentInput;
};


export type MutationUserUpdateArgs = {
  id: Scalars['ID'];
  input: AdminUserUpdateInput;
};


export type MutationVerifyUserIdentityArgs = {
  input: VerifyUserIdentityInput;
  userId: Scalars['ID'];
};

export type Note = {
  __typename?: 'Note';
  createdAt: Scalars['DateTime'];
  creator: User;
  creatorId: Scalars['ID'];
  id: Scalars['ID'];
  text: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user: User;
  userId: Scalars['ID'];
};

export type NoteConnection = {
  __typename?: 'NoteConnection';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types */
  edges: Array<NoteEdge>;
  /** Flattened list of Note type */
  nodes: Array<Note>;
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
  pageInfo: PageInfo;
};

export type NoteEdge = {
  __typename?: 'NoteEdge';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Cursor */
  cursor: Scalars['String'];
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Node */
  node: Note;
};

/** PageInfo cursor, as defined in https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** The cursor corresponding to the last nodes in edges. Null if the connection is empty. */
  endCursor?: Maybe<Scalars['String']>;
  /** Used to indicate whether more edges exist following the set defined by the clients arguments. */
  hasNextPage: Scalars['Boolean'];
  /** Used to indicate whether more edges exist prior to the set defined by the clients arguments. */
  hasPreviousPage: Scalars['Boolean'];
  /** The cursor corresponding to the first nodes in edges. Null if the connection is empty. */
  startCursor?: Maybe<Scalars['String']>;
};

export enum PayNearMeMethodKind {
  Ach = 'ach',
  AchPush = 'ach_push',
  ApplePay = 'apple_pay',
  Cash = 'cash',
  Credit = 'credit',
  Debit = 'debit',
  GooglePay = 'google_pay',
  Paypal = 'paypal',
  Pin4 = 'pin4',
  PushDebit = 'push_debit',
  PushPaypal = 'push_paypal',
  PushPin4 = 'push_pin4',
  Venmo = 'venmo'
}

export type PayNearMeOrder = {
  __typename?: 'PayNearMeOrder';
  id: Scalars['ID'];
  kind: PayNearMeOrderKind;
  methods?: Maybe<Array<PayNearMePaymentMethod>>;
  secureSmartToken?: Maybe<Scalars['String']>;
};

export enum PayNearMeOrderKind {
  Order = 'ORDER',
  PushOrder = 'PUSH_ORDER'
}

export type PayNearMePayment = Payment & {
  __typename?: 'PayNearMePayment';
  amount: Scalars['Decimal'];
  createdAt: Scalars['DateTime'];
  fee: Scalars['Decimal'];
  id: Scalars['ID'];
  kind: PaymentKind;
  method: PaymentMethod;
  status: PaymentStatus;
  user: User;
  userId: Scalars['ID'];
  wallet: Wallet;
};

export type PayNearMePaymentMethod = {
  __typename?: 'PayNearMePaymentMethod';
  account_type: Scalars['String'];
  description: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  number: Scalars['String'];
  status: Scalars['String'];
  type: Scalars['String'];
};

export type PayNearMeWithdrawalInput = {
  amount: Scalars['Decimal'];
  orderId: Scalars['String'];
  paymentMethodId: Scalars['String'];
};

export type Payment = {
  amount: Scalars['Decimal'];
  createdAt: Scalars['DateTime'];
  fee: Scalars['Decimal'];
  id: Scalars['ID'];
  kind: PaymentKind;
  method: PaymentMethod;
  status: PaymentStatus;
  user: User;
  userId: Scalars['ID'];
  wallet: Wallet;
};

export type PaymentConnection = {
  __typename?: 'PaymentConnection';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types */
  edges: Array<PaymentEdge>;
  /** Flattened list of Payment type */
  nodes: Array<Payment>;
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
  pageInfo: PageInfo;
};

export type PaymentEdge = {
  __typename?: 'PaymentEdge';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Cursor */
  cursor: Scalars['String'];
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Node */
  node: Payment;
};

export type PaymentFromSightlineInput = {
  amount: Scalars['Decimal'];
  lastFourDigitsSSN: Scalars['String'];
};

export enum PaymentKind {
  Deposit = 'DEPOSIT',
  Withdraw = 'WITHDRAW'
}

export enum PaymentMethod {
  Ach = 'ACH',
  ApplePay = 'APPLE_PAY',
  Cash = 'CASH',
  CreditCard = 'CREDIT_CARD',
  DebitCard = 'DEBIT_CARD',
  GooglePay = 'GOOGLE_PAY',
  Paypal = 'PAYPAL',
  Pin4 = 'PIN4',
  Sightline = 'SIGHTLINE',
  Venmo = 'VENMO'
}

export enum PaymentStatus {
  Accepted = 'ACCEPTED',
  Canceled = 'CANCELED',
  Completed = 'COMPLETED',
  Declined = 'DECLINED',
  Error = 'ERROR',
  Failed = 'FAILED',
  Initiated = 'INITIATED',
  Pending = 'PENDING',
  Processing = 'PROCESSING',
  Rejected = 'REJECTED',
  Reverse = 'REVERSE'
}

export type PaymentToSightlineInput = {
  amount: Scalars['Decimal'];
};

export type PaymentsStatement = {
  __typename?: 'PaymentsStatement';
  amount: Scalars['String'];
  id: Scalars['ID'];
  method: Scalars['String'];
  status: Scalars['String'];
  time: Scalars['String'];
  type: Scalars['String'];
};

export type Player = {
  __typename?: 'Player';
  birthCity?: Maybe<Scalars['String']>;
  birthDate?: Maybe<Scalars['DateTime']>;
  firstName: Scalars['String'];
  height?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
  jersey?: Maybe<Scalars['Int']>;
  lastName: Scalars['String'];
  photoUrl?: Maybe<Scalars['String']>;
  playerId: Scalars['Int'];
  position?: Maybe<Scalars['String']>;
  positionCategory?: Maybe<Scalars['String']>;
  salary?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['String']>;
  team: Team;
  teamId: Scalars['Int'];
  weight?: Maybe<Scalars['Int']>;
};

export type Position = {
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  accountStatement: AccountStatement;
  adminActivity: Activity;
  adminAllowedStates: Array<State>;
  adminAudit: AdminAudit;
  adminFullBalance: AdminFullBalance;
  adminLegalDocuments: Array<Document>;
  adminPayments: Array<Payment>;
  adminSettings: AdminSettings;
  adminTeamsActivity: Array<TeamActivity>;
  adminUserActivity: Array<User>;
  adminsAudit: Array<AdminAudit>;
  audit: Array<Audit>;
  availableSportLeagues: Array<League>;
  bet: Bet;
  bets: Array<Bet>;
  canceledBets: Array<Bet>;
  game?: Maybe<Game>;
  games?: Maybe<GameConnection>;
  legalDocuments: LegalDocumentsPayload;
  me?: Maybe<User>;
  note?: Maybe<Note>;
  payment?: Maybe<Payment>;
  payments: Array<Payment>;
  player?: Maybe<Player>;
  sightlineBalance?: Maybe<SightlineBalance>;
  sightlineSpanExpressUrl?: Maybe<Scalars['String']>;
  simpleBetInvitation?: Maybe<SimpleBetInvitation>;
  stateByPosition?: Maybe<State>;
  team?: Maybe<Team>;
  teams?: Maybe<Array<Team>>;
  user?: Maybe<User>;
  users: Array<User>;
};


export type QueryAdminActivityArgs = {
  startDate?: InputMaybe<Scalars['DateTime']>;
};


export type QueryAdminAuditArgs = {
  userId: Scalars['ID'];
};


export type QueryAdminFullBalanceArgs = {
  startDate?: InputMaybe<Scalars['DateTime']>;
};


export type QueryAdminTeamsActivityArgs = {
  range?: InputMaybe<DateRangeInput>;
};


export type QueryAdminUserActivityArgs = {
  range: DateRangeInput;
};


export type QueryBetArgs = {
  id: Scalars['ID'];
};


export type QueryBetsArgs = {
  endDate?: InputMaybe<Scalars['DateTime']>;
  startDate?: InputMaybe<Scalars['DateTime']>;
};


export type QueryCanceledBetsArgs = {
  endDate?: InputMaybe<Scalars['DateTime']>;
  startDate?: InputMaybe<Scalars['DateTime']>;
};


export type QueryGameArgs = {
  id: Scalars['Int'];
};


export type QueryGamesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  date?: InputMaybe<Scalars['DateTime']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  league?: InputMaybe<Scalars['ID']>;
  onlyAvailableForBet?: InputMaybe<Scalars['Boolean']>;
  sport?: InputMaybe<Sport>;
  teamId?: InputMaybe<Scalars['Int']>;
};


export type QueryNoteArgs = {
  id: Scalars['ID'];
};


export type QueryPaymentArgs = {
  id: Scalars['ID'];
};


export type QueryPaymentsArgs = {
  userId?: InputMaybe<Scalars['ID']>;
};


export type QueryPlayerArgs = {
  id: Scalars['Int'];
};


export type QuerySightlineBalanceArgs = {
  userId?: InputMaybe<Scalars['ID']>;
};


export type QuerySimpleBetInvitationArgs = {
  id: Scalars['ID'];
};


export type QueryStateByPositionArgs = {
  position: Position;
};


export type QueryTeamArgs = {
  id: Scalars['Int'];
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};


export type QueryUsersArgs = {
  endDate?: InputMaybe<Scalars['DateTime']>;
  startDate?: InputMaybe<Scalars['DateTime']>;
};

export type SightlineBalance = {
  __typename?: 'SightlineBalance';
  balance?: Maybe<Scalars['Decimal']>;
  enrolled?: Maybe<Scalars['Boolean']>;
  faqUrl: Scalars['String'];
  id?: Maybe<Scalars['ID']>;
  ppUrl: Scalars['String'];
  tcUrl: Scalars['String'];
};

export type SightlineEnrollInput = {
  answers?: InputMaybe<Array<KeyValueInput>>;
  ssn: Scalars['String'];
  transactionId: Scalars['String'];
};

export type SightlineEnrollmentStatus = {
  __typename?: 'SightlineEnrollmentStatus';
  questions?: Maybe<Array<SightlineVerificationQuestion>>;
  sightlineId?: Maybe<Scalars['String']>;
};

export type SightlinePayment = Payment & {
  __typename?: 'SightlinePayment';
  amount: Scalars['Decimal'];
  createdAt: Scalars['DateTime'];
  fee: Scalars['Decimal'];
  id: Scalars['ID'];
  kind: PaymentKind;
  method: PaymentMethod;
  sightlineBalance?: Maybe<SightlineBalance>;
  status: PaymentStatus;
  user: User;
  userId: Scalars['ID'];
  wallet: Wallet;
};

export type SightlineVerificationQuestion = {
  __typename?: 'SightlineVerificationQuestion';
  Answers?: Maybe<Array<KeyValue>>;
  Prompt: Scalars['String'];
  QuestionId: Scalars['String'];
  QuestionType: Scalars['String'];
};

export type SignUpInput = {
  address: Scalars['String'];
  city: Scalars['String'];
  dateOfBirth: Scalars['DateTime'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  phoneNumber: Scalars['String'];
  socialSecurityNumber: Scalars['String'];
  state: Scalars['String'];
  zipCode: Scalars['String'];
};

export type SimpleBetInvitation = {
  __typename?: 'SimpleBetInvitation';
  awayTeamName: Scalars['String'];
  betType: BetKind;
  creatorFirstName: Scalars['String'];
  homeTeamName: Scalars['String'];
  id: Scalars['ID'];
  isOpen: Scalars['Boolean'];
};

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export enum Sport {
  Baseball = 'BASEBALL',
  Basketball = 'BASKETBALL',
  Football = 'FOOTBALL',
  Hockey = 'HOCKEY'
}

export type StadiumWeatherCondition = {
  __typename?: 'StadiumWeatherCondition';
  air?: Maybe<Scalars['String']>;
  air_desc?: Maybe<Scalars['Float']>;
  baro_pressure?: Maybe<Scalars['Float']>;
  beaufort?: Maybe<Scalars['Float']>;
  beaufort_desc?: Maybe<Scalars['String']>;
  comfort?: Maybe<Scalars['Float']>;
  date: Scalars['String'];
  dateTime?: Maybe<Scalars['DateTime']>;
  day_of_week?: Maybe<Scalars['Float']>;
  day_sequence?: Maybe<Scalars['Float']>;
  daylight?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  dew_point?: Maybe<Scalars['Float']>;
  high_temp?: Maybe<Scalars['Float']>;
  humidity?: Maybe<Scalars['Float']>;
  icon?: Maybe<Scalars['Float']>;
  icon_name?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  iso8601?: Maybe<Scalars['String']>;
  latitude: Scalars['Decimal'];
  longitude: Scalars['Decimal'];
  low_temp?: Maybe<Scalars['Float']>;
  precip?: Maybe<Scalars['String']>;
  precip_desc?: Maybe<Scalars['Float']>;
  precip_prob?: Maybe<Scalars['Float']>;
  rainfall?: Maybe<Scalars['Float']>;
  sky?: Maybe<Scalars['String']>;
  sky_desc?: Maybe<Scalars['Float']>;
  stadiumId: Scalars['ID'];
  temp?: Maybe<Scalars['String']>;
  temp_desc?: Maybe<Scalars['Float']>;
  uv?: Maybe<Scalars['String']>;
  uv_index?: Maybe<Scalars['Float']>;
  weekday?: Maybe<Scalars['String']>;
  wind_dir?: Maybe<Scalars['Float']>;
  wind_long?: Maybe<Scalars['String']>;
  wind_short?: Maybe<Scalars['String']>;
  wind_speed?: Maybe<Scalars['Float']>;
};

export type State = {
  __typename?: 'State';
  allowsBetting: Scalars['Boolean'];
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type StateConfig = {
  __typename?: 'StateConfig';
  allowsBetting: Scalars['Boolean'];
  countryId: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type Team = {
  __typename?: 'Team';
  active?: Maybe<Scalars['Boolean']>;
  awaySchedule: GameConnection;
  city?: Maybe<Scalars['String']>;
  conference?: Maybe<Scalars['String']>;
  division?: Maybe<Scalars['String']>;
  fullName: Scalars['String'];
  headCoach?: Maybe<Scalars['String']>;
  homeSchedule: GameConnection;
  id: Scalars['Int'];
  key: Scalars['String'];
  leagueId: Scalars['String'];
  name: Scalars['String'];
  photo: Scalars['String'];
  primaryColor?: Maybe<Scalars['String']>;
  quaternaryColor?: Maybe<Scalars['String']>;
  schedule: GameConnection;
  secondaryColor?: Maybe<Scalars['String']>;
  stadiumId?: Maybe<Scalars['ID']>;
  teamId: Scalars['Int'];
  tertiaryColor?: Maybe<Scalars['String']>;
  wikipediaLogoUrl?: Maybe<Scalars['String']>;
};


export type TeamAwayScheduleArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type TeamHomeScheduleArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type TeamPhotoArgs = {
  position?: InputMaybe<ImagePosition>;
  size?: InputMaybe<Scalars['Int']>;
};


export type TeamScheduleArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  onlyAvailableForBet?: InputMaybe<Scalars['Boolean']>;
};

export type TeamActivity = {
  __typename?: 'TeamActivity';
  activity: Activity;
  team: Team;
};

export type TeamConnection = {
  __typename?: 'TeamConnection';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types */
  edges: Array<TeamEdge>;
  /** Flattened list of Team type */
  nodes: Array<Team>;
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
  pageInfo: PageInfo;
};

export type TeamEdge = {
  __typename?: 'TeamEdge';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Cursor */
  cursor: Scalars['String'];
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Node */
  node: Team;
};

export type Transaction = {
  __typename?: 'Transaction';
  amount: Scalars['Decimal'];
  bet?: Maybe<Bet>;
  betId?: Maybe<Scalars['ID']>;
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  flow: TransactionFlow;
  id: Scalars['ID'];
  kind: TransactionKind;
  wallet: Wallet;
  walletId: Scalars['ID'];
};

export type TransactionConnection = {
  __typename?: 'TransactionConnection';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types */
  edges: Array<TransactionEdge>;
  /** Flattened list of Transaction type */
  nodes: Array<Transaction>;
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
  pageInfo: PageInfo;
};

export type TransactionEdge = {
  __typename?: 'TransactionEdge';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Cursor */
  cursor: Scalars['String'];
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Node */
  node: Transaction;
};

export enum TransactionFlow {
  Credit = 'CREDIT',
  Debit = 'DEBIT'
}

export enum TransactionKind {
  Admin = 'ADMIN',
  BetCanceled = 'BET_CANCELED',
  BetCreated = 'BET_CREATED',
  BetFee = 'BET_FEE',
  BetJoined = 'BET_JOINED',
  BetTied = 'BET_TIED',
  BetUserCanceled = 'BET_USER_CANCELED',
  BetWon = 'BET_WON',
  Deposit = 'DEPOSIT',
  Reverse = 'REVERSE',
  Withdraw = 'WITHDRAW'
}

export type UpdateAdminSettingsInput = {
  evsVerification?: InputMaybe<Scalars['Boolean']>;
  ipVerification?: InputMaybe<Scalars['Boolean']>;
  maintenanceMode?: InputMaybe<Scalars['Boolean']>;
  /** List of updates which will be applied to state betting */
  stateBettingUpdates?: InputMaybe<Array<UpdateStateBettingInput>>;
};

export type UpdateStateBettingInput = {
  allowsBetting: Scalars['Boolean'];
  id: Scalars['ID'];
};

export type UploadDriverLicenseInput = {
  /** Base64 encoded */
  driverLicenseBackPhoto: Scalars['String'];
  /** Base64 encoded */
  driverLicenseFrontPhoto: Scalars['String'];
  userId: Scalars['String'];
};

export type UploadLegalDocumentInput = {
  documentKind: LegalDocumentKind;
  /** Base64 encoded */
  legalDocument: Scalars['String'];
  minorUpdate: Scalars['Boolean'];
  stateId?: InputMaybe<Scalars['ID']>;
};

export type User = {
  __typename?: 'User';
  autoDepositStats: AutoDepositsStats;
  autoDepositsConfig: AutoDepositsConfig;
  betSummary: Array<BetSummary>;
  bets: BetConnection;
  betsLostCount: Scalars['Int'];
  betsWith: BetConnection;
  betsWonCount: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  createdBetsCount: Scalars['Int'];
  email: Scalars['String'];
  feed: BetConnection;
  firstName: Scalars['String'];
  friendRequests?: Maybe<UserConnection>;
  friends: UserConnection;
  friendsCount: Scalars['Int'];
  fullName: Scalars['String'];
  id: Scalars['String'];
  identityProviderId: Scalars['String'];
  isActivated: Scalars['Boolean'];
  isCardVerificationInProgress: Scalars['Boolean'];
  isConfirmed: Scalars['Boolean'];
  isLastPrivacyPolicyAccepted?: Maybe<Document>;
  isLastTermsAndConditionsAccepted?: Maybe<Document>;
  isSuspended: Scalars['Boolean'];
  isVerified: Scalars['Boolean'];
  lastName: Scalars['String'];
  lastPrivacyPolicyAccepted?: Maybe<Document>;
  lastTermsAndConditionsAccepted?: Maybe<Document>;
  moneyRefunded: Scalars['Decimal'];
  moneyWagered: Scalars['Decimal'];
  moneyWon: Scalars['Decimal'];
  needsCardVerification: Scalars['Boolean'];
  notes: NoteConnection;
  ownedBets: BetConnection;
  payNearMeOrder?: Maybe<PayNearMeOrder>;
  payments: PaymentConnection;
  personalData?: Maybe<UserPersonalData>;
  playerNumber: Scalars['String'];
  profilePhoto: Scalars['String'];
  publicFeed: BetConnection;
  recentBettors: UserConnection;
  recoveryEmail?: Maybe<Scalars['String']>;
  totalBets: Scalars['Int'];
  wallet: Wallet;
  walletId: Scalars['ID'];
};


export type UserBetSummaryArgs = {
  from: Scalars['DateTime'];
  to: Scalars['DateTime'];
};


export type UserBetsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Array<BetStatus>>;
};


export type UserBetsWithArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Array<BetStatus>>;
};


export type UserFeedArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  endDate?: InputMaybe<Scalars['DateTime']>;
  filter?: InputMaybe<BetFilter>;
  first?: InputMaybe<Scalars['Int']>;
  gameId?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  position?: InputMaybe<Position>;
  startDate?: InputMaybe<Scalars['DateTime']>;
  teamId?: InputMaybe<Scalars['Int']>;
};


export type UserFriendRequestsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type UserFriendsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type UserMoneyRefundedArgs = {
  range?: InputMaybe<DateRangeInput>;
};


export type UserMoneyWageredArgs = {
  range?: InputMaybe<DateRangeInput>;
};


export type UserMoneyWonArgs = {
  range?: InputMaybe<DateRangeInput>;
};


export type UserNotesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type UserOwnedBetsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type UserPayNearMeOrderArgs = {
  kind: PayNearMeOrderKind;
};


export type UserPaymentsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  kind?: InputMaybe<PaymentKind>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<SortOrder>;
};


export type UserPublicFeedArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  endDate?: InputMaybe<Scalars['DateTime']>;
  first?: InputMaybe<Scalars['Int']>;
  gameId?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  position?: InputMaybe<Position>;
  startDate?: InputMaybe<Scalars['DateTime']>;
  teamId?: InputMaybe<Scalars['Int']>;
};


export type UserRecentBettorsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type UserTotalBetsArgs = {
  range?: InputMaybe<DateRangeInput>;
};

export type UserConnection = {
  __typename?: 'UserConnection';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types */
  edges: Array<UserEdge>;
  /** Flattened list of User type */
  nodes: Array<User>;
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
  pageInfo: PageInfo;
};

export type UserEdge = {
  __typename?: 'UserEdge';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Cursor */
  cursor: Scalars['String'];
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Node */
  node: User;
};

export type UserPersonalData = {
  __typename?: 'UserPersonalData';
  address: Scalars['String'];
  city: Scalars['String'];
  cityState?: Maybe<Scalars['String']>;
  dateOfBirth: Scalars['DateTime'];
  id: Scalars['String'];
  phoneNumber: Scalars['String'];
  state: Scalars['String'];
  userId: Scalars['String'];
  zipCode: Scalars['String'];
};

export type VerifyUserIdentityInput = {
  address: Scalars['String'];
  city: Scalars['String'];
  dateOfBirth: Scalars['String'];
  phoneNumber: Scalars['String'];
  socialSecurityNumber: Scalars['String'];
  state: Scalars['String'];
  zipCode: Scalars['String'];
};

export type WagersStatement = {
  __typename?: 'WagersStatement';
  amount: Scalars['String'];
  betId?: Maybe<Scalars['String']>;
  betType?: Maybe<Scalars['String']>;
  choice?: Maybe<Scalars['String']>;
  eventTime?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  resolveTime?: Maybe<Scalars['String']>;
  result?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  time: Scalars['String'];
};

export type Wallet = {
  __typename?: 'Wallet';
  balance: Scalars['Decimal'];
  createdAt: Scalars['DateTime'];
  exposed: Scalars['Decimal'];
  id: Scalars['ID'];
  pendingDeposits: Scalars['Decimal'];
  transactions: TransactionConnection;
  updatedAt: Scalars['DateTime'];
  user: User;
};


export type WalletTransactionsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type AccountStatementQueryVariables = Exact<{ [key: string]: never; }>;


export type AccountStatementQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, firstName: string, lastName: string } | null, accountStatement: { __typename?: 'AccountStatement', payments: Array<{ __typename?: 'PaymentsStatement', id: string, type: string, method: string, time: string, amount: string, status: string }>, wagers: Array<{ __typename?: 'WagersStatement', id: string, time: string, amount: string, betId?: string | null, betType?: string | null, eventTime?: string | null, resolveTime?: string | null, result?: string | null, name?: string | null, choice?: string | null, state?: string | null }> } };


export const AccountStatementDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AccountStatement"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"accountStatement"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"payments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"method"}},{"kind":"Field","name":{"kind":"Name","value":"time"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"Field","name":{"kind":"Name","value":"wagers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"time"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"betId"}},{"kind":"Field","name":{"kind":"Name","value":"betType"}},{"kind":"Field","name":{"kind":"Name","value":"eventTime"}},{"kind":"Field","name":{"kind":"Name","value":"resolveTime"}},{"kind":"Field","name":{"kind":"Name","value":"result"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"choice"}},{"kind":"Field","name":{"kind":"Name","value":"state"}}]}}]}}]}}]} as unknown as DocumentNode<AccountStatementQuery, AccountStatementQueryVariables>;