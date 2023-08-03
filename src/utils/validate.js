export const validate = (inputs) => {
    let errors = {}
  
    if (!inputs.email) {
      errors.email = true
    } else if (!/\S+@\S+\.\S+/.test(inputs.email)) {
      errors.email = true
    } else {
      errors.email = false
    }
  
    if (!inputs.name) {
      errors.name = true
    } else {
      errors.name = false
    }
  
    if (!inputs.password) {
      errors.password = true
    } else if (inputs.password.length < 6) {
      errors.password = true
    } else {
      errors.password = false
    }

    if (!inputs.currPassword) {
      errors.currPassword = true
    } else {
      errors.currPassword = false
    }
  
    return errors
  }