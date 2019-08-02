class Action {
  public cancelled?: boolean

  public cancel() {
    this.cancelled = true
  }
}

export default Action
