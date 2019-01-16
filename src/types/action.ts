class Action {
  cancelled?: boolean

  cancel() {
    this.cancelled = true
  }
}

export default Action
