export const SET_USER_INVESTMENT_QUESTIONNAIRE_ANSWER = `mutation Mutation($questionnaireId: String!, $selectedOptionIdList: [String!]) {
  setUserInvestmentQuestionnaireAnswer(questionnaireId: $questionnaireId, selectedOptionIdList: $selectedOptionIdList) {
    id
    questionnaireId
    selectedOptionId
    userId
  }
}`;

export const SET_USER_INVESTMENT_VALUE_LIST = `
  mutation Mutation($investmentValueIdList: [String!]) {
    setUserInvestmentPreferences(investmentValueIdList: $investmentValueIdList) {
      investmentValueList {
        id
      }
    }
  }
`;

export const SET_USER_ASSET_CLASS_LIST = `
  mutation Mutation($assetClassIdList: [String!]) {
    setUserInvestmentPreferences(assetClassIdList: $assetClassIdList) {
      assetClassList {
        id
      }
    }
  }
`;

export const SET_USER_PORTFOLIO_PREFERENCES = `
  mutation Mutation($assetClassIdList: [String!]!, $investmentValueIdList: [String!]) {
    setUserInvestmentPreferences(assetClassIdList: $assetClassIdList, investmentValueIdList: $investmentValueIdList) {
      assetClassList {
        id
      }
      investmentValueList {
        id
      }
    }
  }
`;

export const SET_USER_PLAID_LINKED_ITEM = `mutation Mutation($plaidLinkedItemList: [UserPlaidLinkedItemInput!]!) {
  setUserPlaidLinkedItem(plaidLinkedItemList: $plaidLinkedItemList) {
    accountId
    accountMask
    accountName
    accountSubtype
    accountType
    active
    id
    institutionId
    institutionName
  }
}`;

export const DELETE_USER_PLAID_LINKED_ITEM = `mutation Mutation($plaidLinkedItemList: [UserPlaidIdentifierInput!]!){
  deleteUserPlaidLinkedItem(plaidLinkedItemList: $plaidLinkedItemList) {
    result
  }
}`;

export const TRANSFER_MONEY = `mutation TransferMoney($amount: Float!, $fromAccountId: String!, $transferType: String!) {
  transferMoney(amount: $amount, fromAccountId: $fromAccountId, transferType: $transferType) {
    isSuccess
    message
  }
}`;
