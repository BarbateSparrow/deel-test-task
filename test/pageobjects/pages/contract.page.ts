class ContractPage {
  get startDate() {return $('[data-qa="contractors-start-date"]')}
  get scope() {return $('[data-qa="cell-info"]')}
  get specialClause() {return $('[data-qa="special-clause-box"]')}
  get rate() {return $('[data-qa="rate"], [data-qa="milestone-amount"]')}
  get contractCountry() {return $('[data-qa="contractors-country"]')}
}

export {ContractPage}
