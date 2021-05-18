class BaseFragment {
  protected get nextButton() {return $('button.w-100')}

  protected async nextPage() {
    await(await this.nextButton).click()
  }
}

export {BaseFragment}
