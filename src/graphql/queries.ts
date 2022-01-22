export const GET_USER_PREFERENCES = `
  query Query($userId: String, $questionnaireId: String, $monthPeriod: Int ) {
    getInvestmentPreferencesSettings {
      assetClassList {
        id
        name
      }
      investmentValueList {
        id
        description
      }
    }
    getUserInvestmentPreferences {
      investmentValueList {
        id
      }
      assetClassList {
        id
      }
    }
    getAllQuestionnaire {
      id
      name
      order
      question
      active
      options {
        id
        active
        description
        option
      }
    }
    getUserInvestmentQuestionnaireAnswers(questionnaireId: $questionnaireId, userId: $userId) {
      questionnaireId
      selectedOptionId
    }
    getUserRecommendedPortfolio {
      id
      asset
      weight
    }
    getUserInvestmentProfileSummary(userId: $userId) {
      equityValue
      cash {
        cashAvailableForTrade
        cashAvailableForWithdrawal
        cashBalance
      }
      equityPositions {
        marketValue
        side
        symbol
      }
    }
    getUserPlaidLinkedItems {
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
    getUserInvestmentPerformance(monthPeriod: $monthPeriod) {
      date
      cash
      deposits
      cumRealizedPL
      equity
      fees
      unrealizedDayPL
      realizedDayPL
      withdrawals
    }
  }
`;

export const GET_RECOMMENDED_PORTFOLIO = `
  query Query($assetClassIdList: [String!], $investmentValueIdList: [String!]) {
    getUserRecommendedPortfolio(assetClassIdList: $assetClassIdList, investmentValueIdList: $investmentValueIdList) {
      id
      asset
      weight
    }
  }
`;

export const GET_PLAID_LINK_TOKEN = `
  query GetPlaidLinkToken {
    getPlaidLinkToken
  }
`;

export const GET_USER_PLAID_LINKED_ITEMS = `query Query {
  getUserPlaidLinkedItems {
    accountId
    accountMask
    accountName
    accountSubtype
    accountType
    active
    createdAt
    id
    institutionId
    institutionName
    userId
    verificationStatus
    updatedAt
  }
}`;

export const GET_USER_FUNDING_TRANSACTION = `
  query GetUserFundingTransaction {
    getUserFundingTransaction {
      id
      active
      amount
      attribute
      createdAt
      currency
      executionDate
      fromAccountTable
      note
      statusNumber
      toAccountId
      toAccountTable
      fundingMethod {
        id
        active
        method
        recurringFundingSetting {
          id
          active
          amount
          currency
          day
          frequency
          nextExecutionDate
        }
      }
    }
  }
`;
